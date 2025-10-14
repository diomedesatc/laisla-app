import styled from "styled-components";
import { InputText2 } from "../../formularios/InputText2";
import { Btn1 } from "../../../moleculas/Btn1";
import { useState } from "react";
import { useUsuarioStore } from "../../../../store/UsuarioStore";
import { useCajaStore } from "../../../../store/CajaStore";
import { useCierreCajaStore } from "../../../../store/CierreCajaStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useFormattedDate } from "../../../../hooks/useFormattedDate";
import { useMetodosDePagoStore } from "../../../../store/MetodosPagoStore";
import { useMovCajaStore } from "../../../../store/MovCajaStore";

export function PantallaCajaApertura(){
    const [montoEfectivo, setMontoEfectivo] = useState(0);
    const fechaActual = useFormattedDate();
    const queryClient = useQueryClient();
    const {dataUsuarios} = useUsuarioStore();
    const {dataCaja} = useCajaStore();
    const {aperturarCaja} = useCierreCajaStore();
    const {dataMetodosPago} = useMetodosDePagoStore();
    const {insertarMovCaja} = useMovCajaStore();

    const registrarMovCaja = async (p) => {
        const id_metodo_pago = dataMetodosPago.filter((item) => item.nombre === 'Efectivo').map((item) => item.id)[0];

        const pmovcaja = {
            fecha_movimiento: fechaActual,
            tipo_movimiento: "apertura",
            monto: montoEfectivo,
            id_metodo_pago: id_metodo_pago,
            descripcion: 'Apertura de caja.',
            id_usuario: dataUsuarios?.id,
            id_cierre_caja: p.id_cierre_caja,
            
        }

        await insertarMovCaja(pmovcaja);
    }

    const insertar = async () => {
        const p = {
            fechainicio: fechaActual,
            fechacierre: fechaActual,
            id_usuario: dataUsuarios?.id,
            id_caja: dataCaja.id,           
            
        }

        const data = await aperturarCaja(p);
        if(montoEfectivo > 0){
            await registrarMovCaja({id_cierre_caja: data?.id})

        }
    }
    
    const mutation = useMutation({
        mutationKey: ["aperturar caja"],
        mutationFn: insertar,
        onSuccess: () => {
            toast.success("Caja aperturada correctamente!")
            queryClient.invalidateQueries("mostrar cierre de caja")
        },
        onError: () => toast.error("Error al aperturar caja")
        
    })
    return (
        <Container>
            <section className="area1">
                <span className="title">Aperturar caja con: </span>
                <InputText2>
                    <input className="form__field" onChange={(e) => setMontoEfectivo(parseFloat(e.target.value))} type="number" placeholder="0.00"/>
                </InputText2>
                <span>En efectivo.</span>
                <article className="contentbtn">
                    <Btn1 titulo="Omitir" funcion={() => {
                        setMontoEfectivo(0)
                        mutation.mutateAsync()
                    }}/>
                    <Btn1 titulo="Aperturar" color="#fff" bgcolor="#3ff563"
                    funcion={() => mutation.mutateAsync()}/>

                </article>

            </section>

        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    width: 100%;
    background-color: ${({theme}) => theme.bgtotal};
    align-items: center;
    justify-content: center;
    display: flex;
    .area1{
        display: flex;
        flex-direction: column;
        gap: 12px;
        .title{
            font-size: 19px;
            font-weight: bold;
        
        }
        .contentbtn{
            display: flex;
            gap: 12px;

        }
    }

    
    
`