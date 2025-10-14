import styled from "styled-components";
import { Buscador, ListaDesplegable, Reloj, useAlmacenesStore, useCartVentasStore, useDetalleVentaStore, useEmpresaStore, useProductosStore, useSucursalesStore, useUsuarioStore, useVentasStore } from "../../../index";
import { v } from "../../../styles/variables";
import { Btn1 } from "../../../index";
import { InputText2 } from "../../../index";
import {Device} from "../../../styles/breakpoints";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

export function HeaderPos() {
    const [stateListaProductos, setStateListaProductos] = useState(false);
    const [stateLectora, setStateLectora] = useState(false);
    const [stateTeclado, setStateTeclado] = useState(true);
    const [cantidadInput, setCantidadInput] = useState(1);

    const { setBuscador, dataProductos, selectProductos, buscador, productosItemSelect} = useProductosStore
();
    const inputref = useRef(null);
    const {insertarVentas, idventa, eliminarventasIncompletas} = useVentasStore();
    const{insertarDetalleVentas} = useDetalleVentaStore();
    const {dataUsuarios} = useUsuarioStore();
    const{dataEmpresa} = useEmpresaStore();
    const{sucursalesItemSelectAsignadas} = useSucursalesStore();
    const{addItem} = useCartVentasStore();
    //const {idalmacenporproducto} = useAlmacenesStore();
    //const obtenerAlmacenPorProducto = useAlmacenesStore((state) => state.obtenerAlmacenPorProducto);

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
        /*const pVentas = {
             id_usuario: dataUsuarios?.id,
             id_empresa: dataEmpresa?.id,              
             id_sucursal: sucursalesItemSelectAsignadas?.id_sucursal, 
        };*/
        const productosItemSelect = useProductosStore.getState().productosItemSelect;

        if(!productosItemSelect){
            Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error.message
                    });
                    return;
        }

        
        //const productosItemSelect = useProductosStores.getState().dataProductos[0];
        //const productosItemSelect = useProductosStores.getState().productosItemSelect;
       
        /*const almacenData = await obtenerAlmacenPorProducto({
            id_sucursal: sucursalesItemSelectAsignadas.id_sucursal,
            id_producto: productosItemSelect.id
        });

        if (!almacenData || !almacenData.id) {
            console.error("Could not find warehouse ID for the selected product and branch.");
            // Optionally, show a Swal error here
            return;
        }*/



        const dVentas = {
            _id_venta: 1,
            _cantidad: parseFloat(cantidadInput) || 1,     
            _precio_venta: productosItemSelect.precio_venta,
            _total: 1 * productosItemSelect.precio_venta,
            _descripcion: productosItemSelect.nombre,
            _id_producto: productosItemSelect.id,
            _precio_compra: productosItemSelect.precio_compra,
            _id_sucursal: sucursalesItemSelectAsignadas.id_sucursal,
            
        }

       

        
       /*if(idventa == 0){
            const result = await insertarVentas(pVentas);
                (dVentas._id_venta = result?.id)
                addItem(dVentas)
                //await insertarDetalleVentas(dVentas);
        }*/
       addItem(dVentas)
        /*if(idventa > 0){
            addItem(dVentas)
            //await insertarDetalleVentas(dVentas);

        }*/
       setBuscador("");
       inputref.current.focus();
       setStateListaProductos(false);
       setCantidadInput(1);


    }

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
                    <ListaDesplegable funcioncrud={funcion_insertarventa} funcion={selectProductos} data={dataProductos} setState={()=>{
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
        display: flex;
        flex-direction: column;
        .usuario{
            font-weight: 700;
        }

    }
    
`;