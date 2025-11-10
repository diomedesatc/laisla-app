import styled from "styled-components";
import { Device } from "../../styles/breakpoints";
import { v } from "../../styles/variables";
import {blur_in} from "../../styles/keyframes"
import { AreadetalleventaPos, AreaTecladoPos, Btn1, FooterPos, MenuFlotante, PantallaCierreCaja, PantallaPago, Reloj, useCartVentasStore, useVentasStore } from "../../index";
import { InputText2 } from "../../index";
import { HeaderPos } from "../../index";
import { Toaster } from "sonner";
import { PantallaIngresoSalidaDinero } from "../organismos/POSDesing/CajaDesign/PantallaIngresoSalidaDinero";
import { useCierreCajaStore } from "../../store/CierreCajaStore";
import { SelectAlmacenModal } from "../organismos/POSDesing/SelectAlmacenModal";
import { useStockStore } from "../../store/StockStore";

export function POSTemplate() {
    const {statePantallaCobro} = useVentasStore();
    const {stateIngresoSalida, stateCierreCaja} = useCierreCajaStore();
    const {stateModal} = useStockStore();
    return (
        <Container>
            {
                stateModal && <SelectAlmacenModal />
            }
            {
                statePantallaCobro && <PantallaPago />
            }
            <HeaderPos />
            <Main>
                <Toaster richColors position="top-center"/>
                <AreadetalleventaPos />
                <AreaTecladoPos />

            </Main>
            <FooterPos />
            <MenuFlotante />
            
            {
                stateIngresoSalida && <PantallaIngresoSalidaDinero />
            }
            {
                stateCierreCaja && <PantallaCierreCaja />

            }
            

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