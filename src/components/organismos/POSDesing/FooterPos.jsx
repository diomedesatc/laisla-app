import styled from "styled-components";
import {Device} from "../../../styles/breakpoints";
import {Btn1, useCartVentasStore, useCierreCajaStore} from "../../../index";
import Swal from "sweetalert2";

export function FooterPos(){
    const {resetState} = useCartVentasStore();
    const {setStateIngresoSalida, setTipoRegistro, setStateCierreCaja} = useCierreCajaStore();
    function EliminarVenta () {
        Swal.fire({
            title: "Eliminar productos",
            text: "Segur@ quieres eliminar todos los productos?",
            icon: "warning",        
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar",
        }).then((result) => {
            if(result.isConfirmed){
                resetState();
            }
        })

    }
    return(
        <Footer>
            <article className="content">
                <Btn1 titulo="Eliminar" funcion={EliminarVenta}/>
                <Btn1 titulo="Cerrar caja" funcion={() => setStateCierreCaja(true)}/>
                <Btn1 titulo="Ingresar dinero" funcion={() => {
                    setStateIngresoSalida(true);
                    setTipoRegistro("ingreso")
                }}/>
                <Btn1 titulo="Retirar dinero" funcion={() => {
                    setStateIngresoSalida(true);
                    setTipoRegistro("salida")
                }}/>

            </article>

        </Footer>
    )
};



const Footer = styled.section`
    grid-area:footer;    
    display: none;
    @media ${Device.desktop} {
        display: flex;
        
    }

    .content{
        display: flex;
        align-items: center;
        gap: 8px;

    }
`;