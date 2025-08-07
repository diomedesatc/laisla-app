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
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";


export function IngresoCobro(){
    
    const {tipoDeCobro, total, items, setStatePantallaCobro,resetState } = useCartVentasStore();
    const [valorEfectivo, setValorEfectivo] = useState(tipoDeCobro === "efectivo" ? total : 0);
    const [valorTransferencia, setValorTransferencia] = useState(tipoDeCobro === "transferencia" ? total : 0);
    const [precioVenta, setPrecioVenta] = useState(total);
    const [vuelto, setVuelto] = useState(0);
    const [restante, setRestante] = useState(0);

    const{dataUsuarios} = useUsuarioStore();
    const{sucursalesItemSelectAsignadas} = useSucursalesStore();
    const{dataEmpresa} = useEmpresaStore();
    const{idventa, insertarVentas, resetearventas} = useVentasStore();
    const {insertarDetalleVentas} = useDetalleVentaStore();

    const CalcularVueltoYRestante = () => {
    const totalPagado = valorEfectivo + valorTransferencia;

    if (totalPagado >= precioVenta) { // Si el pago es igual o mayor al precio de venta
        setVuelto(totalPagado - precioVenta); // Calcula el vuelto
        setRestante(0); // No hay restante por pagar
    } else { // Si el pago es menor al precio de venta
        setVuelto(0); // No hay vuelto
        setRestante(precioVenta - totalPagado); // Calcula lo que falta por pagar
    }
};

    const handleChangeValorEfectivo = (e) => {
        const value = parseFloat(e.target.value) || 0;
        setValorEfectivo(value);
    }

    const handleChangeValorTransferencia = (e) => {
        const value = parseFloat(e.target.value) || 0;
        setValorTransferencia(value);
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
                efectivo: parseFloat(valorEfectivo),
                tarjeta: parseFloat(valorTransferencia),
                monto_total: total,
                tipo_de_pago: tipoDeCobro

            };
            if(idventa === 0){
                const result = await insertarVentas(pventas);
                items.forEach(async(item) =>{
                    if(result?.id > 0){
                        item._id_venta = result?.id
                        await insertarDetalleVentas(item);
                    }
                })

            }
        }
        else{
                toast.warning("Se debe de completar el pago!");
            }


    }

    useEffect(()=> {CalcularVueltoYRestante();}, [precioVenta, valorEfectivo, valorTransferencia]);
    useEffect(() => {
    if (tipoDeCobro === "efectivo") {
        setValorEfectivo(total);
        setValorTransferencia(0); // Asegura que el otro campo se reinicie si cambias de tipo
    } else if (tipoDeCobro === "transferencia") {
        setValorTransferencia(total);
        setValorEfectivo(0); // Asegura que el otro campo se reinicie
    } else if (tipoDeCobro === "mixto") {
        setValorEfectivo(0); // Puedes establecer valores predeterminados o dejarlos en 0 para que el usuario ingrese
        setValorTransferencia(0);
    }
}, [tipoDeCobro, total]);
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
                    </section>
                    <section className="area2">
                        {
                            tipoDeCobro != "efectivo" && tipoDeCobro != "mixto" ? null : (
                                <InputText textalign="left">
                                <input className="form__field" type="number" value={valorEfectivo} onChange={handleChangeValorEfectivo}/>
                                <label className="form__label">Efectivo</label>
                                </InputText>
                            )
                        }
                        {
                            tipoDeCobro != "transferencia" && tipoDeCobro != "mixto" ? null : (
                                <InputText textalign="left">
                                <input disabled={tipoDeCobro === "transferencia" ? true:false} className="form__field" type="number"  value={valorTransferencia} onChange={handleChangeValorTransferencia}/>
                                <label className="form__label">Transferencia</label>
                                </InputText>
                            )
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
                            <span className="total">{FormatearNumeroDinero(total)}</span>
                            <span>{vuelto}</span>
                            <span>{restante}</span>
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
