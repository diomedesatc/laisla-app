import { create } from "zustand";
import { EditarCaja, EliminarCaja, InsertarCaja, MostrarCajaXSucursal } from "../supabase/crudCaja";


export const useCajaStore = create((set) => ({
    dataCaja: null,
    stateCaja: false,
    setStateCaja: (p) => set({ stateCaja: p}),
    accion: "",
    setAccion: (p) => set({accion: p}),
    cajaSelectItem: [],
    setCajaSelectItem: (p) =>{
        set({ cajaSelectItem: p})
    },

    mostrarCajaxSucursal: async(p) => {
        const response = await MostrarCajaXSucursal(p);
        set({cajaSelectItem: response[0]})
        set({dataCaja: response});
        return response;
    },
    insertarCaja: async(p) =>{
        await InsertarCaja(p)
    },
    editarCaja: async(p) =>{
        await EditarCaja(p)
    },
    eliminarCaja: async(p)=>{
        await EliminarCaja(p)
    }
}))