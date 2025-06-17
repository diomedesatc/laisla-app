import styled from "styled-components";
import { ListaDesplegable, Reloj, useProductosStores } from "../../../index";
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
    const {buscador, setBuscador, dataProductos, selectProductos} = useProductosStores();
    const inputref = useRef(null);

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

    useEffect(()=>{
        inputref.current.focus();

    }, [])

    
    return (
        <Header>
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
                    <ListaDesplegable funcion={selectProductos} data={dataProductos} setState={()=>{
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