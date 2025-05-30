import { create } from "zustand"
import { MostrarUsuarios, ObtenerIdAuthSupabase } from "../index"

export const useUsuarioStore = create((set)=>({
    dataUsuarios:[],
    mostrarUsuarios:async()=>{
        const idauth = await ObtenerIdAuthSupabase();
        const response = await MostrarUsuarios({id_auth: idauth});
        set({dataUsuarios:response})
        return response;

    }

}))