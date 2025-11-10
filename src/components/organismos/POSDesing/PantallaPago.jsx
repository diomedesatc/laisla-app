import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { useCartVentasStore } from "../../../store/CartVentasStore";
import { IngresoCobro } from "./IngresoCobro";
import { VisorTicketVenta } from "./VisorTicketVenta";
import { useVentasStore } from "../../../store/VentasStore";

export function PantallaPago(){
    const [stateVerTicket, setStateVerTicket] = useState(false);
    const {setStatePantallaCobro} = useVentasStore();
    return(
        <Container>
            <section className="contentingresopago">
                {
                    stateVerTicket && <VisorTicketVenta setState={() => setStateVerTicket(!stateVerTicket)}/>
                }
                <article onClick={() => setStateVerTicket(!stateVerTicket)} className="contentverticket">
                    <span>{stateVerTicket ? "Ocultar" : "Mostrar"} Ticket</span>
                    {
                        stateVerTicket ? (<Icon icon="material-symbols:arrows-more-down-rounded" width="24" height="24" className="icono"/>) : (<Icon icon="material-symbols:arrows-more-up" width="24" height="24" className="icono"/>)
                    }
                    
                </article>
                <IngresoCobro />
                <article className="contentverticket" onClick={setStatePantallaCobro}>
                    <Icon icon="material-symbols:arrow-back-rounded" width="24" height="24" />
                    <span>Volver</span>
                </article>

            </section>
        </Container>
    )
}

const Container = styled.div`
    position: absolute;
    height: 100%;
    width: 100%; //Tengo que cambiar esto del dise;o
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 100;
    background-color: ${({theme}) => theme.bgtotal};
    

    .contentingresopago{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;        
        height: auto;
        max-height: calc(100% - 4rem);
        overflow-y: auto;
        .contentverticket{
            align-self: flex-end;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            span{
                font-weight: 700px;
                font-size: 18px;
            }

            .icono{
                font-size: 30px;
            }

        }
    }
    
`