import styled from "styled-components";
import { ListaDesplegable, Reloj, useAlmacenesStore, useDetalleVentaStore, useEmpresaStore, useProductosStores, useSucursalesStore, useUsuarioStore, useVentasStore } from "../../../index";
import { v } from "../../../styles/variables";
import { Btn1 } from "../../../index";
import { InputText2 } from "../../../index";
import {Device} from "../../../styles/breakpoints";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";

export function HeaderPos() {
    const [stateListaProductos, setStateListaProductos] = useState(false);
    const [stateLectora, setStateLectora] = useState(false);
    const [stateTeclado, setStateTeclado] = useState(true);
    const { setBuscador, dataProductos, selectProductos, productosItemSelect} = useProductosStores();
    const inputref = useRef(null);
    const {insertarVentas, idventa, eliminarventasIncompletas} = useVentasStore();
    const{insertarDetalleVentas} = useDetalleVentaStore();
    const {dataUsuarios} = useUsuarioStore();
    const{dataEmpresa} = useEmpresaStore();
    const{sucursalesItemSelectAsignadas} = useSucursalesStore();
<<<<<<< HEAD
    //const {idalmacenporproducto} = useAlmacenesStore();
    const obtenerAlmacenPorProducto = useAlmacenesStore((state) => state.obtenerAlmacenPorProducto);
=======
    const {dataalmacenporsucursal} = useAlmacenesStore();
>>>>>>> 35546d99a8f18c2f9f187aeddfaaf697741d7796

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

    async function funcion_insertarventa(){
        const pVentas = {
             id_usuario: dataUsuarios?.id,
             id_empresa: dataEmpresa?.id,              
             id_sucursal: sucursalesItemSelectAsignadas?.id_sucursal, 
        };
<<<<<<< HEAD

        
        const productosItemSelect = useProductosStores.getState().dataProductos[0];

        const almacenData = await obtenerAlmacenPorProducto({
            id_sucursal: sucursalesItemSelectAsignadas.id_sucursal,
            id_producto: productosItemSelect.id
        });

        if (!almacenData || !almacenData.id) {
            console.error("Could not find warehouse ID for the selected product and branch.");
            // Optionally, show a Swal error here
            return;
        }

=======
        
        const productosItemSelect = useProductosStores.getState().dataProductos[0];
        const dataalmacenporsucursal = useAlmacenesStore.getState().dataalmacenporsucursal; 
>>>>>>> 35546d99a8f18c2f9f187aeddfaaf697741d7796


        const dVentas = {
            id_venta: idventa,
            precio_venta: productosItemSelect.precio_venta,
            total: 1 * productosItemSelect.precio_venta,
            descripcion: productosItemSelect.nombre,
            id_producto: productosItemSelect.id,
            precio_compra: productosItemSelect.precio_compra,
            id_sucursal: sucursalesItemSelectAsignadas.id_sucursal,
<<<<<<< HEAD
            id_almacen: almacenData.id
            
        }

        console.log("Detalle de venta (dVentas)", dVentas)

=======
            id_almacen: dataalmacenporsucursal.id
            
        }

>>>>>>> 35546d99a8f18c2f9f187aeddfaaf697741d7796

        
       if(idventa == 0){
            const result = await insertarVentas(pVentas);
                (dVentas.id_venta = result?.id),
            
                await insertarDetalleVentas(dVentas);
        }
        if(idventa > 0){
            await insertarDetalleVentas(dVentas);

        }


    }

    useEffect(()=>{
        inputref.current.focus();
        eliminarventasIncompletas({id_usuario: dataUsuarios?.id })

    }, [dataUsuarios?.id, eliminarventasIncompletas])

    
    return (
        <Header>
            <ContentSucursal>
                <strong>SUCURSAL : </strong> &nbsp; {sucursalesItemSelectAsignadas.sucursal}
            </ContentSucursal>
            <section className="contentPrincipal">
                <ContentUser className="area1">
                    <div className="contentimg">
                        <img src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" />
                    </div>
                    <div className="textos">
                        <span className="usuario">Joceline</span>
                        <span>🧰Admin</span>

                    </div>
                </ContentUser>
                <article className="contentlogo area2">
                    <img src={v.logo} />
                    <span>La Isla Drinks 1.0</span>
                </article>
                <article className="contentfecha area3">
                    <Reloj />
                </article>
            </section>
            <section className="contentBuscador">
                <article className="area1">
                    <InputText2>
                        <input onChange={buscar} ref={inputref} className="form__field" type="text" placeholder="Buscar..." />
                    </InputText2>
                    <ListaDesplegable funcioncrud={funcion_insertarventa} funcion={selectProductos} data={dataProductos} setState={()=>{
                        setStateListaProductos(!stateListaProductos)
                    }} state={stateListaProductos}/>
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
        display: flex;
        flex-direction: column;
        .usuario{
            font-weight: 700;
        }

    }
    
`;