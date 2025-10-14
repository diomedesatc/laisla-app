import { create } from "zustand"
import {InsertarVentas, EliminarVentasIncompletas, MostrarVentas } from "../index"

const initialState = {
    items: [],
    total: 0,
    statePantallaCobro: false,
    tipoDeCobro: "",
    stateMetodosPago: false
}

export const useVentasStore = create((set)=>({
    ...initialState,
    idventa: 0,
    dataVentas: [],
    porcentajeCambio: 0,
    resetearventas: () => set({
        idventa: 0
    }),
    insertarVentas:async(p)=>{
        const result = await InsertarVentas(p);
        set({idventa: result?.id});
        return result;

    },
    eliminarventasIncompletas: async(p)=>{
        await EliminarVentasIncompletas(p);

    },
    mostrarVentas: async(p) =>{       
        const response = await MostrarVentas(p);
        set({ dataVentas: response})
        set({idventa: response?.id?response?.id:0})
        return response;
    }
}));
