import { create } from "zustand"
import { EliminarDetalleVentasIncompletas, InsertarDetalleVenta, MostrarDetalleVenta } from "../index";

export const useDetalleVentaStore = create((set, get)=>({
    datadetalleVenta: [],
    parametros: {},
    mostrarDetalleVenta: async(p) =>{
        const response = await MostrarDetalleVenta(p);
        set({parametros:p})
        set({datadetalleVenta: response,});
        let total = 0;
        response?.forEach((item) =>{
            const array = Object.values(item)
            total += array[4]
        })
        set({total: total})
        return response;

    },
    insertarDetalleVentas:async(p)=>{
        await InsertarDetalleVenta(p);

    },
    eliminarDetalleVentasIncompletas:async(p)=>{
        await EliminarDetalleVentasIncompletas(p);
        const {mostrarDetalleVenta} = get()
        const {parametros} = get()
        set(mostrarDetalleVenta(parametros))
    }

}));
