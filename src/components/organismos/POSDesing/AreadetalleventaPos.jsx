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
                    <span>Stock: 34 UND</span>

                </article>
                <article>
                    <span className="detalle">
                        <strong>Cant:</strong> 1 UND <strong> Importe:</strong> $9.99
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
    width: 100%;
    margin-top: 10px;


`;


const Itemventa = styled.section`
    display: flex;
    justify-content: space-between;
    width: 100%;
    .contentdescription{
        display: flex;
        flex-direction: column;
        .descripcion{
            font-weight: 700;
            font-size: 20px;
        }
    }
    
`;


