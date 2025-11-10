import styled from  "styled-components";
import ticket from "../../../reports/TicketVenta"
import { useEffect, useState } from "react";
import {useCartVentasStore} from '../../../store/CartVentasStore';
import { Icon } from "@iconify/react/dist/iconify.js";
import {useEmpresaStore} from  '../../../store/EmpresaStore';
import {useClientesStore} from "../../../store/ClientesStore";
import { useVentasStore } from "../../../store/VentasStore";
import { useDetalleVentaStore } from "../../../store/DetalleVentaStore";


export function VisorTicketVenta({setState}){
    const [base64, setBase64] = useState("");
        const {items, tipoDeCobro} = useVentasStore();
        const {total} = useDetalleVentaStore();
        const{dataEmpresa} = useEmpresaStore();
        const {clienteproveedorItemSelect} = useClientesStore();
        const fechaActual = new Date();
        const horaActual = fechaActual.getHours();
        const minutosActual = fechaActual.getMinutes();
        const segundosActual = fechaActual.getSeconds();
        const mesActual = fechaActual.getMonth();
        const diaActual = fechaActual.getDate();
        const añoActual = fechaActual.getFullYear();
        
    
        const onGenerateTicket = async(output) =>{
            const dataempresa = {
                //logo: "https://irujexokydsyncibynkv.supabase.co/storage/v1/object/public/imagenes/empresa/5489",
                logo: dataEmpresa.logo,
                productos: items,
                nombre: dataEmpresa.nombre,
                direccion: dataEmpresa.direccion_fiscal,
                hora: horaActual,
                minutos: minutosActual,
                segundos: segundosActual,
                mes: mesActual + 1,
                dia: diaActual,
                ano: añoActual,
                nombre_cliente: clienteproveedorItemSelect?.nombres,
                direccion_cliente: clienteproveedorItemSelect?.direccion,
                rut_cliente: clienteproveedorItemSelect?.identificador_nacional,
                total: total,
                tipodecobro: tipoDeCobro

            }
            const response = await ticket(output, dataempresa)
            if(output === "b64"){
                setBase64(response?.content ?? "");
    
            }
        }
        useEffect(()=> {
            onGenerateTicket("b64")
        },[])
    return (
        <Container>
            <ContentTicket>                    
                <article className="contentverticket" onClick={setState}>
                        <Icon icon="material-symbols:arrows-more-down-rounded" width="24" height="24" />
                        <span>Ocultar Ticket</span>
                    </article>
                <button onClick={()=>onGenerateTicket("print")}>Imprimir TICKET</button>    
                {/*<button onClick={()=>onGenerateTicket("b64")}>Generar TICKET</button>  */}
                <iframe style={{width:"100%", height:"100%"}} src={`data: application/pdf;base64, ${base64}`} />
            </ContentTicket>

        </Container>
    )
}
const Container = styled.div`
    position: absolute;
    z-index: 2;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({theme}) => theme.bgtotal};

`

const ContentTicket = styled.div`
    height: 80%;
    display: flex;
    gap: 10px;
    flex-direction: column;
    
`
