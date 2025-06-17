import styled from "styled-components";
import {Sidebar, SwitchHamburguesa, Spinner1, useEmpresaStore, useUsuarioStore} from "../index"
import { useState } from "react";
import {Device} from "../styles/breakpoints"
import { useQuery } from "@tanstack/react-query";

export function Layout({children}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);   
    const {dataUsuarios, mostrarUsuarios} = useUsuarioStore();
    const {dataEmpresa, mostrarEmpresa} = useEmpresaStore();
    const {isLoading, error} = useQuery({
        queryKey: ["mostrar usuarios"], 
        queryFn: mostrarUsuarios,
        refetchOnWindowFocus: false
    });
    useQuery({
        queryKey: ["mostrar empresa", dataUsuarios?.id],
        queryFn: () => mostrarEmpresa({_id_usuario: dataUsuarios?.id}),
        enabled:!!dataUsuarios,
        refetchOnWindowFocus: false
    })

    if(isLoading){
        return(
            <Spinner1 />
        )
    }

    if(error){
        return(
            <span>Error!</span>
        )
    }


    return (
        <Container className={sidebarOpen ? "active" : ""}>
            <section className='contentSidebar'>
                <Sidebar state={sidebarOpen} setState={() => setSidebarOpen(!sidebarOpen)} />
            </section>
            <section className='contentMenuambur'><SwitchHamburguesa /></section>
            
        <ContainerBody>
            {
                children
            }
        </ContainerBody>

        </Container>
    )
};


const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  transition: 0.1s ease-in-out;
  color: ${(props) => props.theme.text};
  .contentSidebar{
    display: none;

  }

  .contentMenuambur{
    position: absolute;


  }
  @media ${Device.tablet} {
    grid-template-columns: 88px 1fr;
    &.active{
      grid-template-columns: 260px 1fr;
    }
    .contentSidebar{
      display: initial;
    }
    .contentMenuambur{
      display: none;

  }  
    
  }


  
`;
const ContainerBody = styled.section`
    grid-column: 1;
    width: 100%;

    @media ${Device.tablet} {
        grid-column: 2;
        
    }
    
`