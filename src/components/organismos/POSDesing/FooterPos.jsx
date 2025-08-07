import styled from "styled-components";
import {Device} from "../../../styles/breakpoints";
import {Btn1, useCartVentasStore} from "../../../index";

export function FooterPos(){
    const {resetState} = useCartVentasStore();
    return(
        <Footer>
            <article className="content">
                <Btn1 titulo="Eliminar" funcion={resetState}/>
                <Btn1 titulo="Ver ventas del dia y devoluciones"/>

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