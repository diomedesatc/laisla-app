import styled from "styled-components";
import {useDetalleVentaStore, useVentasStore} from "../../../index"
import { useQuery } from "@tanstack/react-query";


export function AreadetalleventaPos() {
    const {datadetalleVenta,mostrarDetalleVenta} = useDetalleVentaStore();
    const {idventa} = useVentasStore();

    const {data} = useQuery({
        queryKey: ["Mostrar detalles de venta", {id_venta: idventa}],
        queryFn: () => mostrarDetalleVenta({id_venta: idventa}),
        enabled: idventa > 0,
        refetchOnWindowFocus: false
    })

    return (

        <Areadetalleventa>
        {
            datadetalleVenta.map((item, index) =>{
                return(
                <Itemventa key={index}>
                <article className="contentdescription">
                    <span className="descripcion">{item.producto}</span>
                    <span>Stock: {item.stock} UND</span>

                </article>
                <article>
                    <span className="detalle">
                        <strong>Cant:</strong> {item.cantidad} UND <strong> Importe:</strong> ${item.total}
                    </span>
                </article>
            </Itemventa>

                )
            })
        }
            
        </Areadetalleventa>
    )
};



const Areadetalleventa = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 10px;
    gap: 10px


`;


const Itemventa = styled.section`
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px dashed ${({theme}) => theme.color2};
    .contentdescription{
        display: flex;
        flex-direction: column;
        .descripcion{
            font-weight: 700;
            font-size: 20px;
        }
    }
    
`;


