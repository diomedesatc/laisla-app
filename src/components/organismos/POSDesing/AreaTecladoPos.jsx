import styled from "styled-components";
import { Btn1 } from "../../moleculas/Btn1";
import { TotalPos } from "../../../index"
import { Device } from "../../../styles/breakpoints";4


export function AreaTecladoPos() {
    return (
        <Container>
            <section className="areatipopago">
                <article className="box">
                    <Btn1 titulo="EFECTIVO" border="0" height="70px" width="100%" bgcolor="#B0DB9C"/>
                    <Btn1 titulo="TRANSFERENCIA" border="0" width="100%" bgcolor="#819A91"/>
                </article>

            </section>
            <section className="totales">
                <TotalPos />

            </section>
        </Container>

    )
}

const Container = styled.div`
    border: 2px solid ${({ theme }) => theme.color2};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    bottom: 10px;
    width: calc(100% - 5px);
    border-radius: 15px;

    @media ${Device.desktop} {
        position: relative;
        width: auto;
        bottom: initial;
        
    }

    .areatipopago{
        display: none;
         @media ${Device.desktop} {
            display: initial;
        
    }
    .box{
        display: flex;
        gap: 20px;
        margin: 10px;
        }
    }

    .totales{
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
    }

    
`