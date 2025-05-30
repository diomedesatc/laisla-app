import { createContext, useContext, useEffect, useState } from "react"
import {supabase, MostrarUsuarios, InsertarEmpresa, InsertarAdmin, MostrarTipoDocumentos, MostrarRolesXnombre} from "../index";
const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState([])
    useEffect(()=>{
        const {data} = supabase.auth.onAuthStateChange(async(event, session) =>{
            if(session== null){
                setUser(null)
            }else{
                setUser(session?.user)
                insertarDatos(session?.user.id,session?.user.email)
            }
        });

        return() =>{
            data.subscription;
        }

    }, []);

    const insertarDatos = async(id_auth, correo) =>{
       const response =  await MostrarUsuarios({id_auth: id_auth});
       if(response){    
            return;

       }else{
        const responseEmpresa = await InsertarEmpresa({id_auth: id_auth});
        console.log("Empresa insertada: ", responseEmpresa)
        
        const responseTipoDoc = await MostrarTipoDocumentos({id_empresa: responseEmpresa?.id});
        const responseRol = await MostrarRolesXnombre({nombre: "Admin"})
        
        const pUser = {
            id_documento: responseTipoDoc[0]?.id,
            id_rol: responseRol?.id,
            correo: correo,
            fecha_registro: new Date(),
            id_auth: id_auth
        }
        console.log(pUser)
        await InsertarAdmin(pUser)

       }
    }

    return (
        <AuthContext.Provider value={{user}}>
            {
                children
            }
        </AuthContext.Provider>
    )
};

export const UserAuth = () =>{
    return useContext(AuthContext)
}