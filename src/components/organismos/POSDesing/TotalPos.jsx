import styled from "styled-components";
import { Btn1 } from "../../../index";
import {Device} from "../../../styles/breakpoints"
import { Icon } from "@iconify/react/dist/iconify.js";

export function TotalPos(){
    return(
        <Container>
            <section className="contentTotal">
                <section className="contentTituloTotal">
                    <Btn1 titulo="Cobrar" icono={<Icon icon="material-symbols:price-check-rounded" width="24" height="24" />}/>
                    <Btn1 titulo="..." />
                </section>
                <section className="contentPrecio">                    
                    <span>$ 9.90</span>
                </section>
            </section>

        </Container>
    )
};

const Container = styled.div`
    display: flex;
    text-align: center;
    border-radius: 15px;
    font-weight: 700;
    font-size: 40px;
    background-color: #35d627;
    padding: 10px;
    color: #0c8a08;
    position: relative;
    overflow: hidden;

    .contentTotal{
        margin-top: 10px;
        display: flex;     
        width:100%;
        justify-content: space-between;


        .contentTituloTotal{
            display: flex;
            margin-top: 30px;
            gap: 10px;
            @media ${Device.desktop} {
                display: none;
                
            }
        }

        .contentPrecio{
            display: flex;
            align-items: center;
        }

    }
    
`