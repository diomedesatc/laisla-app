import styled from "styled-components";
import { useCierreCajaStore } from "../../../../store/CierreCajaStore";
import { VolverBtn } from "../../../moleculas/VolverBtn";
import { InputText2 } from "../../formularios/InputText2";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import { Btn1 } from "../../../moleculas/Btn1";
import { useCajaStore } from "../../../../store/CajaStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useMovCajaStore } from "../../../../store/MovCajaStore";
import { useMetodosDePagoStore } from "../../../../store/MetodosPagoStore";
import { ConvertirCapitalize } from "../../../../utils/Conversiones";
import { useUsuarioStore } from "../../../../store/UsuarioStore";
import { useFormattedDate } from "../../../../hooks/useFormattedDate";

export function PantallaIngresoSalidaDinero(){
    const {setStateCierreCaja, tipoRegistro, insertarIngresosSalidasCaja,setStateIngresoSalida} = useCierreCajaStore();
    const fechaActual = useFormattedDate();
    const {insertarMovCaja} = useMovCajaStore();
    const {dataMetodosPago} = useMetodosDePagoStore();
    const [startDate, setStartDate] = useState(new Date());
    const [selectMetodo, setSelectMetodo] = useState(null);
    const {dataCaja} = useCajaStore();
    const {register, formState: {errors}, handleSubmit, reset} = useForm();
    const {dataUsuarios} = useUsuarioStore();
    const {dataCierraCaja} = useCierreCajaStore();

    const insertar = async (data) => {

        const pmovcaja = {
            fecha_movimiento: fechaActual,
            tipo_movimiento: tipoRegistro,
            monto: parseFloat(data.monto),
            id_metodo_pago: selectMetodo?.id,
            descripcion: `${tipoRegistro === "ingreso" ? "Ingreso" : "Salida"} de dinero con ${selectMetodo?.nombre}.${data.motivo? `- detalle ${data.motivo}` : ""}`,
            id_usuario: dataUsuarios?.id,
            id_cierre_caja: dataCierraCaja?.id,
            
        }

        await insertarMovCaja(pmovcaja);
    }

    const {isPending, mutate: doInsertar} = useMutation({
        mutationKey: ["Insertar ingresos salidas caja"],
        mutationFn: insertar,
        onSuccess: () => {
            toast.success("Registrado!");
            setStateIngresoSalida(false);
            reset();
        },
        onError: () => {
            toast.error("Error al registrar!")
        }

    })

    const handleSub = (data) => {
        doInsertar(data);
    }

    const handleMetodoClick = (item) =>{
        setSelectMetodo(item);
    }

    useEffect(() => {
        const efectivo = dataMetodosPago?.find((item) => item.nombre === "Efectivo");
        if(efectivo){
            setSelectMetodo(efectivo);
        }
    }, [dataMetodosPago])

    return(
        <Container>
            <VolverBtn funcion={() => setStateIngresoSalida(false)}/>
            <span className="title">
                {
                    tipoRegistro === "ingreso" ?
                    "Ingresar dinero a caja" : 
                    "Retirar dinero de caja"
                }
            </span>
            <section className="areatipopago">
                {
                    dataMetodosPago?.filter((item) => item.nombre !== "Mixto").map((item, index)=>{
                        return(
                            <article className="box" key={index}>
                                <Btn1 
                                titulo={ConvertirCapitalize(item.nombre)} 
                                border="0" 
                                height="70px" 
                                width="100%" 
                                funcion={() => handleMetodoClick(item)}
                                bgcolor={item.id === selectMetodo?.id ? "#FFD700" : "#FFF"}
                                />
                                            
                            </article>
            
                            )
                        })
                }
                            
            
            </section>
            <form onSubmit={handleSubmit(handleSub)}>
                <section className="area1">
                    <span>Monto: </span>
                    <InputText2>
                    <input className="form__field" placeholder="0.00" type="number" {...register("monto", {required: true})}/>
                    {
                        errors.monto?.type === "required" && <p>Campo requerido</p>
                    }
                    </InputText2>
                    {/*<StyledDataPickerWrapper>
                        <StyledDatePicker dateFormat="dd/MM/yyyy" placeholderText="Seleccione una fecha." selected={startDate} onChange={(date) => setStartDate(date)}/>
                    </StyledDataPickerWrapper>*/}
                    <span>
                        Motivo (Puede estar vacio.)
                    </span>
                    <InputText2>
                        <textarea className="form__field" rows="3" placeholder="Motivo..." {...register("motivo")}/>
                    </InputText2>
                    <article className="contentbtn">
                        <Btn1 titulo={"Registrar"} color="#fff" border="2px"  bgcolor="#1da939"/>
                    </article>
                    
                </section>
                
            </form>

        </Container>

    )
}

const Container = styled.div`
    height: 100vh;
    position: absolute;
    background-color: ${({theme})=> theme.bgtotal};
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
      .areatipopago{
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        padding: 10px;
        justify-content: center;
      
        .box{
            flex: 1 1 40%;
            display: flex;
            }
        }

    .title{
        font-size: 25px;
        font-weight: bold;
    }

    .area1{
        display: flex;
        flex-direction: column;
        gap: 12px;
        .contentbtn{

        }
    }
    
`;

const StyledDataPickerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    
`;

const StyledDatePicker = styled(DatePicker)`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 2px solid ${({theme}) => theme.color2};
    background-color: ${({theme}) => theme.bgtotal};
    color: ${({theme}) => theme.text};
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    &:focus{
        outline: none;
        box-shadow: 0px 0px 5px ${({theme}) => theme.primary};
        border-color: ${({theme}) => theme.primary};

    }
    &::placeholder{
        color: ${({theme}) => theme.placeholder}
    }
`