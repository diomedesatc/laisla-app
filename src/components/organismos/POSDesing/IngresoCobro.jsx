import styled from "styled-components";
import { useCartVentasStore } from "../../../store/CartVentasStore";
import { InputText } from "../formularios/InputText";
import { FormatearNumeroDinero } from "../../../utils/Conversiones";
import { useEffect, useState } from "react";
import { Btn1 } from "../../moleculas/Btn1";
import { useUsuarioStore } from "../../../store/UsuarioStore";
import { useSucursalesStore } from "../../../store/SucursalesStore";
import { useEmpresaStore } from "../../../store/EmpresaStore";
import { useVentasStore } from "../../../store/VentasStore";
import { useDetalleVentaStore } from "../../../store/DetalleVentaStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useClientesStore } from "../../../store/ClientesStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import { PanelBuscador } from "./PanelBuscador";
import { useMetodosDePagoStore } from "../../../store/MetodosPagoStore";
import { useCierreCajaStore } from "../../../store/CierreCajaStore";
import { useMovCajaStore } from "../../../store/MovCajaStore";
import { useFormattedDate } from "../../../hooks/useFormattedDate";


export function IngresoCobro(){
    
    const {tipoDeCobro, total, items, setStatePantallaCobro,resetState } = useCartVentasStore();
    const [valorEfectivo, setValorEfectivo] = useState(tipoDeCobro === "efectivo" ? total : 0);
    const [valorTransferencia, setValorTransferencia] = useState(tipoDeCobro === "transferencia" ? total : 0);
    const [precioVenta, setPrecioVenta] = useState(total);
    const [valoresPago, setValoresPago] = useState([]);


    const [vuelto, setVuelto] = useState(0);
    const [restante, setRestante] = useState(0);
    //Data de tipo de pago
    const{dataMetodosPago} = useMetodosDePagoStore();

    const [stateBuscadorCliente, setStateBuscadorCliente] = useState(false);

    const{dataUsuarios} = useUsuarioStore();
    const{sucursalesItemSelectAsignadas} = useSucursalesStore();
    const{dataEmpresa} = useEmpresaStore();
    const{idventa, insertarVentas, resetearventas} = useVentasStore();
    const {insertarDetalleVentas} = useDetalleVentaStore();
    const{dataCliente, mostrarCliente, dataclienteproveedor, setBuscarClienteOProveedor, setBuscador, buscador, selectClienteProveedor, clienteproveedorItemSelect} = useClientesStore();
    const {dataCierraCaja, insertarIngresosSalidasCaja} = useCierreCajaStore();
    const {insertarMovCaja} = useMovCajaStore();
    const fechaActual = useFormattedDate();

    const{data: dataClienteBuscador, isLoading: isLoadingBuscadorCliente} = useQuery(
        {
            queryKey: ["buscar cliente", [dataEmpresa?.id, "cliente", buscador]],
            queryFn: () => setBuscarClienteOProveedor({
                id_empresa: dataEmpresa?.id,
                tipo: "cliente",
                buscador: buscador
            }),
            enabled: !!dataEmpresa,
            refetchOnWindowFocus: false
        }
    );



    const CalcularVueltoYRestante = () => {

        const totalPagado = Object.values(valoresPago).reduce(
      (acc, curr) => acc + curr,
      0
    );
    const totalSinEfectivo = totalPagado - (valoresPago["Efectivo"] || 0);
    // Si el total sin efectivo excede el precio de venta, no permitir el exceso
    if (totalSinEfectivo > precioVenta) {
      setVuelto(0);
      setRestante(precioVenta - totalSinEfectivo); //Restante negativo para indicar que se excede sin efectivo
    } else {
      // Permitir el exceso solo si es en efectivo
      if (totalPagado >= precioVenta) {
        const exceso = totalPagado - precioVenta;
        setVuelto(valoresPago["Efectivo"] ? exceso : 0);
        setRestante(0);
      } else {
        // Si el total pagado no cubre el precio de venta, calcular el restante
        setVuelto(0);
        setRestante(precioVenta - totalPagado);
      }
    }


    
    }
    const handleChangePago = (tipo, valor) => {
        setValoresPago((prev) => ({
            ...prev, 
            [tipo]: parseFloat(valor) || 0,
        }));

    }

    const mutation = useMutation({
        mutationKey:  "insertar ventas",
        mutationFn: InsertarVentas,
        onSuccess: () =>{
            if(restante != 0){
                return;
            }
            setStatePantallaCobro({tipoDeCobro: ""});
            resetState();
            resetearventas();
            toast.success("Venta genedara correctamente.");
        }
    })

    async function InsertarVentas () {
        if(restante === 0){
            const pventas = {                
                id_usuario: dataUsuarios?.id,
                id_sucursal: sucursalesItemSelectAsignadas?.id_sucursal,
                id_empresa: dataEmpresa?.id,
                estado: "confirmada",
                vuelto: vuelto,
                monto_total: total,
                id_cliente: clienteproveedorItemSelect?.id,
                id_cierre_caja: dataCierraCaja?.id,
                fecha: fechaActual,

            };
            if(idventa === 0){
                const result = await insertarVentas(pventas);
                items.forEach(async(item) =>{
                    if(result?.id > 0){
                        item._id_venta = result?.id
                        await insertarDetalleVentas(item);
                    }
                });
                if(result.id > 0){
                    //Insertar movimiento de caja los metodos que tengan valores mayor a 0
                    for(const [tipo, monto] of Object.entries(valoresPago)){
                        if(monto > 0){
                            const metodoPago = dataMetodosPago.find((item) => item.nombre === tipo)
                            const pmovcaja = {
                                tipo_movimiento: "ingreso",
                                monto: monto,
                                id_metodo_pago: metodoPago?.id,
                                descripcion: `Pago de venta con ${tipo}`,
                                id_usuario: dataUsuarios?.id,
                                id_cierre_caja: dataCierraCaja?.id,
                                id_ventas: result?.id,
                                vuelto: tipo=== "efectivo" ? vuelto : 0,
                            }

                            await insertarMovCaja(pmovcaja);
                        }
                    }
                }

            }
        }
        else{
                toast.warning("Se debe de completar el pago!");
            }


    }

    useEffect(()=> {CalcularVueltoYRestante();}, [precioVenta, tipoDeCobro, valoresPago]);
    useEffect(()=>{
        if(tipoDeCobro !== "Mixto" && valoresPago[tipoDeCobro] != total){
            setValoresPago((prev) => ({
                ...prev,
                [tipoDeCobro]:total
            }))
        }

    },[tipoDeCobro, total])
    

    return(
        <Container>
            {
                mutation.isPending ? 
                (<span>Guardando...</span>) :                
                (
                    <>
                    {
                        mutation.isError && <span>Error: {mutation.error.message}</span>
                    }
                    <section className="area1">
                        <span className="tipodecobro">{tipoDeCobro}</span>
                        <span>Cliente</span>
                        <EditButton onClick={() => setStateBuscadorCliente(!stateBuscadorCliente)}>

                            <Icon className="icono" icon="lets-icons:edit-fill" />
                        </EditButton>
                        <span className="cliente">{clienteproveedorItemSelect?.nombres}</span>
                    </section>
                    <section className="area2">                        
                            {dataMetodosPago?.map((item, index) => {
                            return(tipoDeCobro === "Mixto" && item.nombre !== "Mixto")||(tipoDeCobro === item.nombre && item.nombre !== "Mixto") ? (
                           <InputText textalign="left" key={index}>
                                <input className="form__field" type="number" onChange={(e) => handleChangePago(item.nombre, e.target.value)}
                                defaultValue={tipoDeCobro=== item.nombre ? total : ""}
                                disabled={tipoDeCobro === "Mixto" || tipoDeCobro === "Efectivo" ? false : true}
                                />
                                <label className="form__label">{item.nombre}</label>
                                </InputText>
                           ) : null;                              
                            

                        })
                    }                      

                    </section>
                    <Linea />
                    <section className="area3">
                        <article>
                            <span className="total">Total: </span>
                            <span>Vuelto: </span>
                            <span>Restante: </span>
                        </article>
                        <article>
                            <span className="total">{FormatearNumeroDinero(total, dataEmpresa?.currency, dataEmpresa?.iso)}</span>
                            <span>{FormatearNumeroDinero(vuelto, dataEmpresa?.currency, dataEmpresa?.iso)}</span>
                            <span>{FormatearNumeroDinero(restante, dataEmpresa?.currency, dataEmpresa?.iso)}</span>
                        </article>

                    </section>
                    <Linea />
                    <section className="area4">
                        <Btn1 
                        border="2px"
                        titulo="Cobrar..."
                        bgcolor="#0aca21"
                        color="#fff"
                        width="100%"    
                        funcion={() => mutation.mutateAsync()}            
                        />

                    </section>
                    {
                        stateBuscadorCliente && (
                            <PanelBuscador selector={selectClienteProveedor} setBuscador={setBuscador} displayField="nombres" setStateBuscador={() => setStateBuscadorCliente(!stateBuscadorCliente)} data={dataClienteBuscador}/>
                        )
                    }
                    </>
                    
                )
            }
           
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    box-sizing: border-box;
    width: 400px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 2px 2px 15px 0px #e2e2e2;
    gap: 12px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    color: #000;
    min-height: 100px;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    input{
        color: #000 !important;
        font-weight: 700px;
    }
    &::before,
    &::after{
        content: "";
        position: absolute;
        left: 5px;
        height: 6px;
        width: 380px;
        
    }
    &::before{
        top: -5px;
        background: radial-gradient(
            circle,
            transparent,
            transparent 50%,
            #fbfbfb 50%,
            #fbfbfb 100%
        ) -7px -8px / 16px 16px repeat repeat-x;
    }

    
    &::after{
        top: -5px;
        background: radial-gradient(
            circle,
            transparent,
            transparent 50%,
            #fbfbfb 50%,
            #fbfbfb 100%
        ) -7px -8px / 16px 16px repeat repeat-x;
    }

    .area1{
        display: flex;
        flex-direction: column;

        .tipodecobro{
            position: absolute;
            right: 6px;
            top: 6px;
            padding: 5px;
            background-color: rgba(233,6,184,0.2);
            color: #e61eb1;
            border-radius: 5px;
            font-size: 15px;
            font-weight: 700;
        }
    }

    .area3{
        display: flex;
        justify-content: space-between;
        width: 100%;
        article{
            display: flex;
            flex-direction: column;
        }

        .total{
            font-weight: 700;
        }
    }
    
`
const Linea = styled.span`
    width: 100%;
    border-bottom: dashed 1px #d4d4d4;
`
const EditButton = styled.button`
    background-color: #62c6f7;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    .icono{
        font-size: 20px;
    }
`