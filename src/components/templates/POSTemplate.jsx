import styled from "styled-components";
import { Device } from "../../styles/breakpoints";
import { v } from "../../styles/variables";
import { AreadetalleventaPos, AreaTecladoPos, Btn1, FooterPos, Reloj } from "../../index";
import { InputText2 } from "../../index";
import { HeaderPos } from "../../index";

export function POSTemplate() {
    return (
        <Container>
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