import { Navigate, useLocation } from "react-router-dom"
import { UserAuth } from "../context/AuthContent";
import { usePermisosStore } from "../store/PermisosStore";

export const ProtectedRoute = ({ children, accessBy}) =>{
    const {user} = UserAuth();
    const {dataPermisosGlobales} = usePermisosStore();

    const location = useLocation();

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