import styled from "styled-components";
import {v} from "../../styles/variables"
import { Btn1, Buscador, RegistrarCategorias, TablaCategorias, Title, useCategoriasStores } from "../../index";
import { useState } from "react";

export function CategoriasTemplate(){
    const [openRegistro, setOpenRegistro] = useState(false)
    const[action, setAction] = useState("");
    const[dataSelect, setDataSelect] = useState([]);
    const {dataCategorias, setBuscador} = useCategoriasStores();
    function nuevoRegistro(){
        setOpenRegistro(!openRegistro);
        setAction("Nuevo");
        setDataSelect([]);
    }
    return(
        <Container>
            {
                openRegistro && (<RegistrarCategorias accion={action} dataSelect={dataSelect} onClose={()=> setOpenRegistro(!openRegistro)}/>)
            }
            <section className="area1">
                <Title>
                    Categorias
                </Title>
                <Btn1  funcion={nuevoRegistro} bgcolor={v.colorPrincipal} titulo="Nuevo" icono={<v.iconoagregar/>} />

            </section>
            <section className="area2">
                <Buscador setBuscador={setBuscador}/>              

            </section>
            <section className="main">
                <TablaCategorias SetopenRegistro= {setOpenRegistro} data={dataCategorias} setAccion={setAction} setdataSelect={setDataSelect} />
                
            </section>

        </Container>
    )
}

const Container = styled.div`
height: calc(100vh - 30px);
padding: 15px;
display: grid;
grid-template: 
"area1" 60px
"area2" 60px
"main" auto;

.area1{
    grid-area: area1;
    //background-color: rgba(212, 243, 98, 0.596);
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 15px;

}
.area2{
    grid-area: area2;
    //background-color: rgba(247, 207, 216, 0.808);
    display: flex;
    justify-content: end;
    align-content: center;

}
.main{
    grid-area: main;
    //background-color: rgba(166, 214, 214,0.8)
    
}
    
`