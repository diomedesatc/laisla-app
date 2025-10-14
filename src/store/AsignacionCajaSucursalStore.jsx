import { create } from "zustand";
import { MostrarSucursalCajaAsignada, MostrarUsuariosAsignados, BuscarUsuariosAsignados} from "../supabase/crudAsignacionSucursal"
export const useAsignacionCajaSucursalStore= create((set)=>({
    accion: "",
    setAccion: (p) =>{
        set({accion: p})
    },
    buscador: "",
    setBuscador: (p) =>{
        set({buscador: p})
    },
    selectItem: null,
    setSelectItem: (p) => {
        set({selectItem: p})

    },
    dataSucursalesAsignadas:null,
    sucursalesItemSelectAsignadas:null,
    dataUsuariosAsignados: [],
    mostrarSucursalCajaAsignada:async(p)=>{
        const response = await MostrarSucursalCajaAsignada(p)
        set({dataSucursalesAsignadas:response})
        set({sucursalesItemSelectAsignadas:response})
        return response;
    },
    mostrarUsuarioAsignados: async (p) => {
        const response = await MostrarUsuariosAsignados(p);
        set({dataUsuariosAsignados: response})
        return response;
    },
    buscarUsuarioAsignados: async (p) => {
        const response = await BuscarUsuariosAsignados(p);
        set({dataUsuariosAsignados: response})
        return response;
    },
    
}))