import { create } from "zustand"
import { MostrarRoles } from "../supabase/crudRoles";

export const useRolesStore = create((set)=>({
    dataRoles:[],
    selectRolesItem:null,
    setSelectRolesItem: (p) => {
        set({selectRolesItem: p})
    },
    mostrarRoles:async()=>{
        const response = await MostrarRoles();
        set({dataRoles:response})
        set({selectRolesItem: response[0]})
        return response;

    }

}))