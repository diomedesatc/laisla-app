import styled from "styled-components"
import { ButtonDashed } from "../ui/buttons/ButtonDashed"
import { ListSucursales } from "../organismos/SucursalesDesing/ListSucursales"
import { RegistrarSucursal } from "../organismos/formularios/RegistrarSucursal"
import { Toaster } from "sonner"
import { useCajaStore, useSucursalesStore } from "../.."
import { RegistrarCaja } from "../organismos/formularios/RegistrarCaja"
import { AnimatedGrid } from "../ui/animated/AnimatedGrid"

export function SucursalesCajasTemplate(){
    const {stateSucursal, setStateSucursal} = useSucursalesStore();
    const {stateCaja} = useCajaStore();
    return(
        <Container>
            <Toaster richColors position="top-right" />
            {
                stateSucursal && <RegistrarSucursal />
            }
            {
                stateCaja && <RegistrarCaja />
            }
            <section className="area1">
                <Header>
                    <Title>Cajas por sucursal </Title>
                    <Subtitle>Gestiona tus sucursales y cajas</Subtitle>
                    <ButtonDashed title="Agregar sucursal" funcion={() => setStateSucursal(true)}/>
                </Header>

            </section>
            <section className="area2">
                <ListSucursales />

            </section>
            <AnimatedGrid />

        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    display: grid;
    position: relative;
    grid-template: 
    "area1" 300px
    "area2" auto;
    .area1{
        grid-area: area1;
        display: flex;
        flex-direction: column;


    }

    .area2{
        grid-area: area2;
        padding-bottom: 20px;

    }
`

const Header = styled.div`
    margin-bottom: 20px;
    text-align: center;
    justify-content: center;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const Title = styled.h3`
    font-size: 25px;
    font-weight: bold;
    color: ${({theme}) => theme.text};
    margin: 0;
`

const Subtitle = styled.p`
    font-size: 18px;
    color: #6b7280;
    margin: 5px 0 0;
`