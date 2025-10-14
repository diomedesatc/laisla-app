import styled from "styled-components";
import {v} from "../../styles/variables"
import { Btn1, Buscador, RegistrarCategorias, RegistrarClientesProveedores, TablaCategorias, TablaClientesProveedores, Title, useCategoriasStores, useClientesStore } from "../../index";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export function ClientesProveedoresTemplate(){
    const [openRegistro, setOpenRegistro] = useState(false)
    const[action, setAction] = useState("");
    const[dataSelect, setDataSelect] = useState([]);
    const location = useLocation();
    const{tipo, setTipo, dataclienteproveedor, setBuscador} = useClientesStore();



    function nuevoRegistro(){
        const tipo = location.pathname === "/configuracion/clientes" ? "cliente" : "proveedor"
        setTipo(tipo);
        setOpenRegistro(!openRegistro);
        setAction("Nuevo");
        setDataSelect([]);
    }
    return(
        <Container>
            {
                openRegistro && (<RegistrarClientesProveedores accion={action} dataSelect={dataSelect} onClose={()=> setOpenRegistro(!openRegistro)}/>)
            }
            <section className="area1">
                <Title>
                    {location.pathname=="/configuracion/clientes" ? "Clientes" : "Proveedores"}
                </Title>
                <Btn1  funcion={nuevoRegistro} bgcolor={v.colorPrincipal} titulo="Nuevo" icono={<v.iconoagregar/>} />

            </section>
            <section className="area2">
                <Buscador setBuscador={setBuscador}/>              

            </section>
            <section className="main">
                 <TablaClientesProveedores SetopenRegistro= {setOpenRegistro} data={dataclienteproveedor} setAccion={setAction} setdataSelect={setDataSelect} />
                
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