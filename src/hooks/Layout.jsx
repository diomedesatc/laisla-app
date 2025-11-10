import styled from "styled-components";
import { Sidebar, SwitchHamburguesa, Spinner1, useEmpresaStore, useUsuarioStore, MenuMovil, useSucursalesStore, UserAuth } from "../index";
import { useState } from "react";
import { Device } from "../styles/breakpoints";
import { useQuery } from "@tanstack/react-query";
import { usePermisosStore } from "../store/PermisosStore";

export function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stateMenu, setStateMenu] = useState(false); // Estado para el menú móvil

  // Hooks de datos (mantener como están)
  const { mostrarUsuarios } = useUsuarioStore();
  const { dataEmpresa, mostrarEmpresa } = useEmpresaStore();
  const { mostrarSucursalesPorUsuario } = useSucursalesStore();
  const { mostrarPermisosGlobales } = usePermisosStore();
  const {user} = UserAuth();
  const id_auth = user?.id;

  const {data: dataUsuarios, error: errorUsuarios, isLoading: isLoadingUsuarios} = useQuery({
    queryKey: ["mostrar usuarios"],
    queryFn: () => mostrarUsuarios({id_auth: id_auth}),
    refetchOnWindowFocus: false,
    enabled: !!id_auth
  });

  const {isLoading: isLoadingSuUs} = useQuery({
    queryKey: ["mostrar sucursal por usuario", dataUsuarios?.id],
    queryFn: () => mostrarSucursalesPorUsuario({ id_usuario: dataUsuarios?.id }),
    enabled: !!dataUsuarios,
    refetchOnWindowFocus: false
  });

  const { isLoading: isLoadingEmpresa, error } = useQuery({
    queryKey: ["mostrar empresa", dataUsuarios?.id],
    queryFn: () => mostrarEmpresa({ _id_usuario: dataUsuarios?.id }),
    enabled: !!dataUsuarios,
    refetchOnWindowFocus: false
  });

  const isLoading = isLoadingEmpresa || isLoadingUsuarios || isLoadingSuUs;


  if (isLoading) {
    return <Spinner1 />;
  }

  if (error) {
    return <span>Error!</span>;
  }

  return (
    // Usamos un Fragmento para agrupar elementos hermanos.
    // El MenuMovil y el SwitchHamburguesa deben estar fuera del Container principal
    // para que position: fixed funcione correctamente respecto al viewport.
    <>
      <HamburguesaAndMenuContainer>
        <SwitchHamburguesa state={stateMenu} setstate={() => setStateMenu(!stateMenu)} />
        {/* Renderiza MenuMovil solo si stateMenu es true */}
        {stateMenu && <MenuMovil state={stateMenu} setState={() => setStateMenu(!stateMenu)} />}
      </HamburguesaAndMenuContainer>

      <MainLayoutContainer $isopen={sidebarOpen}>
        {/* Sidebar visible solo en desktop */}
        <DesktopSidebarContainer>
          <Sidebar state={sidebarOpen} setState={() => setSidebarOpen(!sidebarOpen)} />
        </DesktopSidebarContainer>

        {/* Contenido principal de la aplicación */}
        <AppContentContainer>
          {children}
        </AppContentContainer>
      </MainLayoutContainer>
    </>
  );
}

// --- Componentes Styled ---

const HamburguesaAndMenuContainer = styled.div`
  /* Esta sección contendrá el botón de hamburguesa y el menú móvil.
     Será visible solo en dispositivos móviles. */
  position: absolute; /* Ajusta según dónde quieras el botón de hamburguesa */
  //top: 10px; /* Ejemplo de posicionamiento */
  //left: 10px; /* Ejemplo de posicionamiento */
  z-index: 101; /* Asegura que esté por encima de otros elementos */

  @media ${Device.tablet} {
    display: none; /* Ocultar en desktop */
  }
`;

const MainLayoutContainer = styled.main`
  display: grid;
  grid-template-columns: 1fr; /* Por defecto, solo una columna para el contenido */
  transition: 0.1s ease-in-out;
  color: ${(props) => props.theme.text};
  min-height: 100vh; /* Asegura que el layout ocupe al menos toda la altura de la vista */

  @media ${Device.tablet} {
    /* En tablet y desktop, ajustamos el grid para el sidebar */
    grid-template-columns: 88px 1fr; /* Sidebar cerrado */
    &.active {
      grid-template-columns: 260px 1fr; /* Sidebar abierto */
    }
  }
`;

const DesktopSidebarContainer = styled.section`
  display: none; /* Por defecto oculto en mobile */

  @media ${Device.tablet} {
    display: initial; /* Visible en tablet y desktop */
    /* Aquí puedes añadir estilos específicos para el contenedor del sidebar si es necesario */
  }
`;

const AppContentContainer = styled.section`
  grid-column: 1; /* Por defecto, el contenido ocupa la primera columna */
  width: 100%;

  @media ${Device.tablet} {
    grid-column: 2; /* En tablet y desktop, el contenido ocupa la segunda columna */
  }
`;

// --- Styled Componentes para MenuMovil (si es necesario ajustar) ---
// (Mantén tus estilos de MenuMovil como los tenías, solo asegúrate de que el 'Container'
// de MenuMovil no tenga un `transform` que interfiera con su `position: fixed`.)

// Ejemplo de cómo podría ser el Container de MenuMovil si no lo modificaste:
/*
const Container = styled.div`
  background: ${({ theme }) => theme.bgtotal};
  color: ${(props) => props.theme.text};
  position: fixed; // Esto es crucial para que funcione como menú fijo
  top: 0;
  left: 0;
  z-index: 100;
  height: 100%;
  width: 100%;
  transition: 0.1s ease-in-out;
  overflow-y: auto;
  overflow-x: hidden;
  border-right: 2px solid ${({ theme }) => theme.color2};
  // ... (otros estilos)
`;
*/