import { create } from "zustand"
import { EliminarAlmacen, InsertarStockAlmacen, MostrarAlmacenPorSucursal, MostrarStockAlmacenPorSucursal } from "../index"

export const useAlmacenesStore = create((set)=>({
    
    dataalmacen: [],
    dataalmacenporsucursal: [],
    mostrarAlmacen:async (p) =>{
        const response = await MostrarStockAlmacenPorSucursal(p);
        set({dataalmacen: response});
        return response;

    },
    
    mostrarAlmacenPorSucursal:async (p) =>{
        const response = await MostrarAlmacenPorSucursal(p);
        set({dataalmacenporsucursal: response});
        return response;

    },
    insertarStockAlmacenes:async(p)=>{
        await InsertarStockAlmacen(p);

    },
    eliminarAlmacen: async(p) =>{
        await EliminarAlmacen(p);
    },

}));