import styled from "styled-components";
import { Buscador, ListaDesplegable, Reloj, useAlmacenesStore, useCierreCajaStore, useDetalleVentaStore, useEmpresaStore, useProductosStore, useSucursalesStore, useUsuarioStore, useVentasStore } from "../../../index";
import { v } from "../../../styles/variables";
import { Btn1 } from "../../../index";
import { InputText2 } from "../../../index";
import {Device} from "../../../styles/breakpoints";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";
import { useFormattedDate } from "../../../hooks/useFormattedDate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { SelectList } from "../../ui/list/SelectList";
import { useStockStore } from "../../../store/StockStore";

export function HeaderPos() {
    const [stateListaProductos, setStateListaProductos] = useState(false);
    const [stateLectora, setStateLectora] = useState(false);
    const [stateTeclado, setStateTeclado] = useState(true);
    const [cantidadInput, setCantidadInput] = useState(1);
    const queryClient = useQueryClient();

    const { setBuscador, dataProductos, selectProductos, buscador, productosItemSelect} = useProductosStore
();
    const inputref = useRef(null);
    const {insertarVentas, idventa, eliminarventasIncompletas} = useVentasStore();
    const{insertarDetalleVentas} = useDetalleVentaStore();
    const {dataUsuarios} = useUsuarioStore();
    const{dataEmpresa} = useEmpresaStore();
    //const {sucursalesItemSelectAsignadas, dataSucursalesAsignadas} = useAsignacionCajaSucursalStore();
    const {sucursalesItemSelectAsignadas} = useSucursalesStore();
    const {dataCierraCaja} = useCierreCajaStore();
    const fechaActual = useFormattedDate();
    const {almacenItemSelect, dataAlmacenSucursal, setAlmacenItemSelect} = useAlmacenesStore();
    const {dataStockXAlmacenesXProducto, setStateModal, stateModal} = useStockStore();

    function buscar(e){
        setBuscador(e.target.value);
        let texto = e.target.value;
        if(texto.trim() ==="" || stateLectora){
            setStateListaProductos(false);
        }else{
            setStateListaProductos(true);
        }

    };

    function focusClick(){
        inputref.current.focus();
        if(inputref.current.value.trim() === ""){
            setStateListaProductos(false);
        }else{
            setStateListaProductos(true);
        }
    };

    async function insertarventas(){
        if(idventa === 0){
            const pventas = {
                fecha: fechaActual,
                id_usuario: dataUsuarios?.id,
                id_sucursal: sucursalesItemSelectAsignadas?.id_sucursal,
                id_empresa: dataEmpresa?.id,
                id_cierre_caja: dataCierraCaja?.id

            }
            const result = await insertarVentas(pventas)
            if(result?.id > 0){
                await insertarDVentas(result?.id)
            }

        }else{
            await insertarDVentas(idventa)

        }
       setBuscador("");
       inputref.current.focus();
       setStateListaProductos(false);
       setCantidadInput(1);


    }

    async function insertarDVentas(idventa){
        
        const productosItemSelect = useProductosStore.getState().productosItemSelect; 

        const dVentas = {
            _id_venta: idventa,
            _cantidad: parseFloat(cantidadInput) || 1,     
            _precio_venta: productosItemSelect.precio_venta,
            _descripcion: productosItemSelect.nombre,
            _id_producto: productosItemSelect.id,
            _precio_compra: productosItemSelect.precio_compra,
            _id_sucursal: sucursalesItemSelectAsignadas.id_sucursal,
            _id_almacen: almacenItemSelect?.id
            
        }
        await insertarDetalleVentas(dVentas);


    }

    const {mutate: mutationInsertarVentas} = useMutation({
        mutationKey: ["insertar ventas"],
        mutationFn: insertarventas,
        onError: (e) =>{
            toast.error(`Error: ${e.message}`)
            queryClient.invalidateQueries(["mostrar Stock X Almacenes X Producto"])
            if(dataStockXAlmacenesXProducto){
                setStateModal(true)

            }
        },
        onSuccess: () =>{
            queryClient.invalidateQueries(["mostrar detalle venta"])
            
        }
    })

    const ValidarCantidad = (e) => {
        const value = Math.max(1, parseInt(e.target.value) || 1);
        setCantidadInput(value);
    }

    useEffect(()=>{
        inputref.current.focus();
        //eliminarventasIncompletas({id_usuario: dataUsuarios?.id })

    }, [])

    
    return (
        <Header>
            <ContentSucursal>
                <strong>SUCURSAL : </strong> &nbsp; {sucursalesItemSelectAsignadas?.sucursal}
            </ContentSucursal>
            <section className="contentPrincipal">
                <ContentUser className="area1">
                    <div className="contentimg">
                        <img src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" />
                    </div>
                    <div className="textos">
                        <span className="usuario">{dataUsuarios?.nombres}</span>
                        <span>🧰{dataUsuarios?.roles?.nombre}</span>

                    </div>
                </ContentUser>
                <article className="contentlogo area2">
                    <span>Almacen: </span>
                    <SelectList data={dataAlmacenSucursal} itemSelect={almacenItemSelect} onSelect={setAlmacenItemSelect} displayField="nombre"/>
                
                </article>
                <article className="contentfecha area3">
                    <Reloj />
                </article>
            </section>
            <section className="contentBuscador">
                <article className="area1">
                    <div className="contentCantidad">
                    <InputText2>
                    <input placeholder="cantidad..." type="number" min="1" className="form__field" value={cantidadInput} onChange={ValidarCantidad}/>

                    </InputText2>
                     </div>
                    <InputText2>
                        <input onChange={buscar} ref={inputref} className="form__field" type="search" placeholder="Buscar..." value={buscador} onKeyDown={(e) => {
                            if(e.key === 'ArrowDown' && stateListaProductos){
                                e.preventDefault();
                                document.querySelector("[tabindex='0'").focus()
                            }
                        }}/>
                    <ListaDesplegable funcioncrud={mutationInsertarVentas} funcion={selectProductos} data={dataProductos} setState={()=>{
                        setStateListaProductos(!stateListaProductos)
                    }} state={stateListaProductos}/>
                    
                    </InputText2>
                   
                </article>
                <article className="area2">
                    <Btn1 funcion={()=>{
                        setStateLectora(true);
                        setStateTeclado(false);
                        setStateListaProductos(false);
                        focusClick();
                    }}
                    bgcolor={stateLectora? "#9B7EBD" : ({theme}) => theme.bgtotal} color={stateLectora ? "#fff" : ({theme}) => theme.text} titulo="Lectora" icono={<Icon icon="material-symbols:barcode-scanner" width="24" height="24" />} border="2px"/>
                    <Btn1 funcion={()=>{
                        setStateLectora(false);
                        setStateTeclado(true);
                        focusClick(); 
                    }}

                     bgcolor={stateTeclado? "#F49BAB" : ({theme}) => theme.bgtotal} color={stateTeclado ? "#fff" : ({theme}) => theme.text} titulo="Teclado" icono={<Icon icon="material-symbols:keyboard-alt-outline-sharp" width="24" height="24" />}border="2px" />
                </article>
            </section>
        </Header>

    )
};


const Header = styled.div`
    grid-area: header;
    display: flex;
    height: 100%;
    flex-direction: column;
    gap: 10px;
    @media ${Device.desktop} {
        border-bottom: 2px solid ${({ theme }) => theme.color2};

        
    }
    .contentPrincipal{
        width: 100%;
        display: grid;
        grid-template: "area1 area2"
                        "area3 area3";
                        .area1{
                            grid-area: area1;

                        }
                        .area2{
                            grid-area: area2;

                        }
                        .area3{
                            grid-area: area3;

                        }
        @media ${Device.desktop} {
            display: flex;
            justify-content: space-between;
            
        }
        
        .contentlogo{
            display: flex;
            align-items: center;
            font-weight: 700;
            gap: 9px;
            img{
                width: 50px;
                object-fit: contain;
            }

        }

    }

    .contentBuscador{
        display: grid;
        grid-template: "area2 area2"
                        "area1 area1";
        gap: 10px;
        height: 100%;
        align-items: center;
        .area1{
            grid-area: area1;
            display: flex;
            gap: 30px;
            .contentCantidad{
                width: 150px;


            }
        }
        .area2{
            grid-area: area2;
            display: flex;
            gap: 10px;
        }
        @media ${Device.desktop} {
            display: flex;
            gap: 10px;
            .area1{
                width: 40vw;
            }
            
        }

        

    }

    
`;

const ContentSucursal = styled.section`
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 55px;
    border-bottom: 2px solid ${({theme}) => theme.color2};
    
`;


const ContentUser = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    grid-area: "area1";
    .contentimg{
        display: flex;
        align-items: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        img{
            width: 100%;
            object-fit: cover;
            }
    }
    .textos{
        display: none;
        .usuario{
            font-weight: 700;
        }
        @media ${Device.laptop} {
            display: flex;
            flex-direction: column;
            
        }

    }
    
`;