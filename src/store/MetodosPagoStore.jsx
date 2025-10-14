import { create } from "zustand";
import { EditarMetodosPago, EliminarMetodosPago, InsertarMetodosPago, MostrarMetodosDePago } from "../supabase/crudMetodosPago";

export const useMetodosDePagoStore = create((set) =>({
    dataMetodosPago: null,
    mostrarMetodosPago: async (p) => {
        const response = await MostrarMetodosDePago(p);        
        set({dataMetodosPago: response});
        return response;
    },
    metodosPagoItemSelect: [],
    selectMetodosPago: (p) =>{
        set({metodosPagoItemSelect: p});
    },
    insertarMetodosPago: async (p, file) =>{
        await InsertarMetodosPago(p, file);
    },
    eliminarMetodosPago: async(p) =>{
        await EliminarMetodosPago(p);
    },
    editarMetodosPago: async(p, fileold ,filenew) => {
        await EditarMetodosPago(p,fileold, filenew);
    },
    
}))