import styled from "styled-components";
import {Device} from "../../../styles/breakpoints";
import {Btn1, useCierreCajaStore, useVentasStore} from "../../../index";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function FooterPos(){
    const {resetState, eliminarVenta, idventa} = useVentasStore();
    const {setStateIngresoSalida, setTipoRegistro, setStateCierreCaja} = useCierreCajaStore();
    const queryClient = useQueryClient();

    const {mutate: mutateEliminarVenta, isPending: isPendingEliminarVenta} = useMutation({
        mutationKey: ["eliminar venta"],
        mutationFn: () => {
            if(idventa>0){
                return eliminarVenta({id: idventa})
            }else{
                return Promise.reject(new Error("sin registro de venta para eliminar"))
            }
        },
        onError: (e) =>{
            toast.error(`Error al eliminar ${e.message}`)
        },
        onSuccess: () =>{
            toast.success("Venta eliminada")
            queryClient.invalidateQueries(["mostrar detalle venta"])

        }

    })

    return(
        <Footer>
            <article className="content">
                <Btn1 titulo="Eliminar" funcion={mutateEliminarVenta} disabled={isPendingEliminarVenta}/>
                <Btn1 titulo="Cerrar caja" funcion={() => setStateCierreCaja(true)}/>
                <Btn1 titulo="Ingresar dinero" funcion={() => {
                    setStateIngresoSalida(true);
                    setTipoRegistro("ingreso")
                }}/>
                <Btn1 titulo="Retirar dinero" funcion={() => {
                    setStateIngresoSalida(true);
                    setTipoRegistro("salida")
                }}/>

            </article>

        </Footer>
    )
};



const Footer = styled.section`
    grid-area:footer;    
    display: none;
    @media ${Device.desktop} {
        display: flex;
        
    }

    .content{
        display: flex;
        align-items: center;
        gap: 8px;

    }
`;