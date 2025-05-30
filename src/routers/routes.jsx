import {Routes, Route} from "react-router-dom";
import { Home, Login, ProtectedRoute, UserAuth, Configuraciones, Categorias, useUsuarioStore, Spinner1, useEmpresaStore } from "../index";
import { useQuery } from "@tanstack/react-query";
export function MyRoutes(){
    
    const {user} = UserAuth();
    const {dataUsuarios, mostrarUsuarios} = useUsuarioStore();
    const {dataEmpresa, mostrarEmpresa} = useEmpresaStore();
    const {isLoading, error} = useQuery({
        queryKey: "mostrar usuarios", queryFn: mostrarUsuarios
    });
    const {} = useQuery({
        queryKey: ["mostrar empresa", dataUsuarios?.id],
        queryFn: () => mostrarEmpresa({_id_usuario: dataUsuarios?.id}),
        enabled:!!dataUsuarios
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

    return(
    <Routes>
        <Route element={<ProtectedRoute user={user} redirectTo="/login"  />}>        
            <Route path="/" element={<Home />}></Route>
            <Route path="/configuracion" element={<Configuraciones />}></Route>
            <Route path="/configuracion/categorias" element={<Categorias />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
    </Routes> 
    )

}  