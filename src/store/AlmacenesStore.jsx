import { create } from "zustand"
import { EliminarAlmacen, InsertarStockAlmacen, MostrarStockAlmacenPorSucursal } from "../index"

export const useAlmacenesStore = create((set)=>({
    
    dataalmacen: [],
    mostrarAlmacen:async (p) =>{
        const response = await MostrarStockAlmacenPorSucursal(p);
        set({dataalmacen: response});
        return response;

    },
    insertarStockAlmacenes:async(p)=>{
        await InsertarStockAlmacen(p);

    },
    eliminarAlmacen: async(p) =>{
        await EliminarAlmacen(p);
    },

}));