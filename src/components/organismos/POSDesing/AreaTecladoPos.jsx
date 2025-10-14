import styled from "styled-components";
import { Btn1 } from "../../moleculas/Btn1";
import { ConvertirCapitalize, TotalPos, useCartVentasStore, useEmpresaStore, useMetodosDePagoStore } from "../../../index"
import { Device } from "../../../styles/breakpoints";import { useQuery } from "@tanstack/react-query";
4


export function AreaTecladoPos() {
    const {setStatePantallaCobro, stateMetodosPago} = useCartVentasStore();
    const{dataEmpresa} = useEmpresaStore();
    const{dataMetodosPago} = useMetodosDePagoStore();

    /*const{data: dataMetodosPago} = useQuery({
        queryKey: ["mostrar metodos de pago"],
        queryFn: () => mostrarMetodosPago({id_empresa: dataEmpresa?.id}),
        enabled: !!dataEmpresa
    })*/

    
    return (
        <Container stateMetodosPago={stateMetodosPago}>
            <section className="areatipopago">
                {
                    dataMetodosPago?.map((item, index)=>{
                        return(
                            <article className="box" key={index}>
                                <Btn1 
                                    funcion={()=> setStatePantallaCobro({
                                    tipoDeCobro: item.nombre })} 
                                    titulo={ConvertirCapitalize(item.nombre)} 
                                    border="0" 
                                    height="70px" 
                                    width="100%" 
                                />
                                
                            </article>

                        )
                    })
                }
                

            </section>
            
            <section className="totales">
                <TotalPos />

            </section>
        </Container>

    )
}

const Container = styled.div`
    border: 2px solid ${({ theme }) => theme.color2};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    bottom: 10px;
    width: calc(100% - 5px);
    border-radius: 15px;

    @media ${Device.desktop} {
        position: relative;
        width: auto;
        bottom: initial;
        
    }

    .areatipopago{
            display: ${({stateMetodosPago}) => (stateMetodosPago ? "flex" : "none")};
            flex-wrap: wrap;
            gap: 10px;
            padding: 10px;
            justify-content: center;
         @media ${Device.desktop} {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            padding: 10px;
            justify-content: center;

        
    }
    .box{
        flex: 1 1 40%;
        display: flex;
        }
    }

    .totales{
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
    }

    
`