import { create } from "zustand"
import { InsertarDetalleVenta, MostrarDetalleVenta } from "../index";

export const useDetalleVentaStore = create((set, get)=>({
    datadetalleVenta: [],
    parametros: {},
    mostrarDetalleVenta: async(p) =>{
        const response = await MostrarDetalleVenta(p);
        set({parametros:p})
        set({datadetalleVenta: response});
        return response;

    },
    insertarDetalleVentas:async(p)=>{
        await InsertarDetalleVenta(p);
        const {mostrarDetalleVenta} = get()
        const {parametros} = get()
        set(mostrarDetalleVenta(parametros))

    },

}));
