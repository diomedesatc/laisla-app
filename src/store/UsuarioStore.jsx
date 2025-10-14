import { create } from "zustand"
import { EliminarUsuario, InsertarCredencialesUser, InsertarUsuarios, MostrarUsuarios, ObtenerIdAuthSupabase } from "../index"
import { InsertarAsignacionCajaSucursal } from "../supabase/crudAsignacionSucursal";
import { usePermisosStore } from "./PermisosStore";
import { InsertarPermisos } from "../supabase/crudPermisos";

export const useUsuarioStore = create((set, get)=>({
    refecths: null,
    dataUsuarios:[],
    mostrarUsuarios:async(p)=>{
        const idauth = await ObtenerIdAuthSupabase();
        const response = await MostrarUsuarios({id_auth: idauth});
        set({dataUsuarios:response});
        set({refecths: p.refecths })
        return response;

    },
    insertarUsuario: async (p) =>{
        const selectModules = usePermisosStore.getState().selectModulosP || [];

        const data = await InsertarCredencialesUser({
            email: p.email,
            pass: p.pass
        })

        const dataUserNew = await InsertarUsuarios({
            nombres: p.nombres,
            nro_doc: p.nro_doc,
            telefono: p.telefono,
            id_rol: p.id_rol,
            correo: p.email,
            id_auth: data,

        });

        await InsertarAsignacionCajaSucursal({
            id_sucursal: p.id_sucursal,
            id_usuario: dataUserNew?.id,
            id_caja: p.id_caja
        })

        if(Array.isArray(selectModules) && selectModules.length > 0){
            selectModules.forEach(async (idModule) =>{
                let p = {
                    id_usuario: dataUserNew?.id,
                    idmodulo: idModule
                }

                await InsertarPermisos(p);

            })
        }else{
            throw new Error("No hay modulos seleccionados");
        }


    },
    eliminarUsuarioAsignado: async(p) =>{
        await EliminarUsuario(p);
        
    }

}))