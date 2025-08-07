import styled from "styled-components";
import {Btn1, LottieAnimation, useCartVentasStore, useDetalleVentaStore, useVentasStore, } from "../../../index"
import { useQuery } from "@tanstack/react-query";
import {blur_in} from "../../../styles/keyframes";
import { RiDeleteBin2Line } from "react-icons/ri";
import {FormatearNumeroDinero} from "../../../utils/Conversiones"
import animacionVacia from "../../../assets/animacionVacia.json";
import { Icon } from "@iconify/react/dist/iconify.js";



export function AreadetalleventaPos() {
    const{items, addcantidaditem, restarcantidaditem, removeItem } = useCartVentasStore();

    return (

        <Areadetalleventa className={items.length > 0 ? "" : "animacion"}>
        {
            items.length > 0 ? (                
            items.map((item, index) =>{
                return(
                <Itemventa key={index}>
                <article className="contentdescription">
                    <span className="descripcion">{item._cantidad} {item._descripcion}</span>
                    <span className="importe"><strong> Precio:</strong> {FormatearNumeroDinero(item._precio_venta)}</span>
                </article>
                <article className="contentBtn">
                    <Btn1 funcion={()=>addcantidaditem(item)} icono={<Icon icon="material-symbols:expand-circle-up-outline"  />} width="35px" height="35px">

                    </Btn1>
                    <Btn1 funcion={()=>restarcantidaditem(item)} icono={<Icon icon="material-symbols:expand-circle-down-outline-rounded"  />} width="35px" height="35px">
                        
                    </Btn1>
                </article>
                <article className="contentCantidad">
                    <span className="cantidad">
                         {FormatearNumeroDinero(item._total)} 
                    </span>                    
                    <span className="delete" onClick={ () => removeItem(item)}>
                        <RiDeleteBin2Line />
                    </span>
                </article>
            </Itemventa>

                )
            })
            ):(<LottieAnimation animacion={animacionVacia} ancho={200} alto={200}/>)
        }
            
        </Areadetalleventa>
    )
};



const Areadetalleventa = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 10px;
    gap: 10px;

    &.animacion{
        height: 100%;
        justify-content: center;
    }


`;


const Itemventa = styled.section`
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px dashed ${({theme}) => theme.color2};    
    animation: ${blur_in} 0.6s;
    .contentdescription{
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 100%;
        .descripcion{
            font-weight: 700;
            font-size: 20px;
        }
        .importe{
            font-size: 12px;

        }
    }

    .contentBtn{
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
    }

    .contentCantidad{
        display: flex;
        flex-direction: column;
        text-align: end;
        justify-content: end;
        margin-bottom: 10px;
        width: 100%;
        .delete{
            cursor: pointer;
            width: 20px;
            align-self: flex-end;

        }
    }
    
`;


