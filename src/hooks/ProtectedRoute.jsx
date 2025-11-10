import { Navigate, useLocation } from "react-router-dom"
import { UserAuth } from "../context/AuthContent";
import { usePermisosStore } from "../store/PermisosStore";
import { useQuery } from "@tanstack/react-query";
import { useUsuarioStore } from "../store/UsuarioStore";

export const ProtectedRoute = ({ children, accessBy}) =>{
    const {user} = UserAuth();
    const {mostrarPermisosGlobales} = usePermisosStore();
    const {dataUsuarios} = useUsuarioStore();

    const location = useLocation();

    
    const {data: dataPermisosGlobales, isLoading: isLoadingPermisosGlobales} = useQuery({
    queryKey: ["mostrar permisos globales"],
    queryFn:() => mostrarPermisosGlobales({
      id_usuario: dataUsuarios?.id
    }),
    enabled: !!dataUsuarios
    })

    if(isLoadingPermisosGlobales){
        return <span>Cargando permisos...</span>
    }
    const hasPermission = dataPermisosGlobales?.some((item) => item.modulos?.link === location.pathname)

    
    if(accessBy === "non-authenticated"){
        if(!user){
            return children;
        }else{

            return <Navigate to="/" />

        }
    }else if(accessBy === "authenticated"){
        if(user){
            if(!hasPermission){
                return <Navigate to="/404" />
            }
            return children;
        }
    }

    return <Navigate to="/login" />

}