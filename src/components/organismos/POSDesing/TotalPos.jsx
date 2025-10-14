import styled from "styled-components";
import { Btn1, useCartVentasStore, useDetalleVentaStore, useEmpresaStore } from "../../../index";
import {Device} from "../../../styles/breakpoints"
import { Icon } from "@iconify/react/dist/iconify.js";
import {FormatearNumeroDinero} from "../../../utils/Conversiones"
import { useValidarPermisosOperativos } from "../../../hooks/useValidarPermisosOperativos"

export function TotalPos(){
    const {total, setStatePantallaCobro, setStateMetodosPago} = useCartVentasStore();
    const{validarPermiso} = useValidarPermisosOperativos();
    const{dataEmpresa} = useEmpresaStore();

    const validarPermisosCobrar = () =>{
        const hasPermission = validarPermiso("Ventas");
        console.log(hasPermission)
        if(!hasPermission) return;
        setStateMetodosPago();
    }
    return(
        <Container>
            <section className="contentTotal">
                <section className="contentTituloTotal">
                    <Btn1 funcion={setStateMetodosPago} titulo="Cobrar" icono={<Icon icon="material-symbols:price-check-rounded" width="24" height="24" />}/>
                    
                </section>
                <section className="contentPrecio">                  
                    <span>{FormatearNumeroDinero(total, dataEmpresa?.currency, dataEmpresa?.iso)}</span>

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