import styled from "styled-components";
import { Device } from "../../styles/breakpoints";
import { v } from "../../styles/variables";
import {blur_in} from "../../styles/keyframes"
import { AreadetalleventaPos, AreaTecladoPos, Btn1, FooterPos, PantallaPago, Reloj, useCartVentasStore } from "../../index";
import { InputText2 } from "../../index";
import { HeaderPos } from "../../index";
import { Toaster } from "sonner";

export function POSTemplate() {
    const {statePantallaCobro} = useCartVentasStore();
    return (
        <Container>
            <Toaster position="top-center"/>
            {
                statePantallaCobro && <PantallaPago />
            }
            <HeaderPos />
            <Main>
                <AreadetalleventaPos />
                <AreaTecladoPos />

            </Main>
            <FooterPos />

        </Container>
    )
}

const Container = styled.div`
    height: calc(100vh - 60px);
    display: grid;
    padding: 10px;
    padding-top: 60px;
    gap: 10px;
    grid-template: 
        "header" 220px
        "main" auto;

    animation: ${blur_in} 0.6s;
    position: relative;
    @media ${Device.desktop} {                        
    grid-template: 
        "header header" 140px
        "main main"
        "footer footer" 60px;  

    }

    
`; 


const Main = styled.div`
    grid-area: main;    
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
    overflow: hidden;
    gap: 10px;
    @media ${Device.desktop} {                        
        flex-direction: row;

    }

    
`;