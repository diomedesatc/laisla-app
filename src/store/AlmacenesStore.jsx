import { create } from "zustand"
import { EliminarAlmacen, InsertarStockAlmacen, MostrarAlmacenPorProducto, MostrarAlmacenes } from "../index"

export const useAlmacenesStore = create((set)=>({
    
    dataalmacen: [],
    dataalmacenporsucursal: [],
    //idalmacenporproducto: null,
    mostrarAlmacen:async (p) =>{
        const response = await MostrarAlmacenes(p);
        set({dataalmacen: response});
        return response;

    },
    
    obtenerAlmacenPorProducto:async (p) =>{
        const response = await MostrarAlmacenPorProducto(p);
        set({dataalmacenporsucursal: response});
        //set({idalmacenporproducto: response.id})
        return response;

    },
    insertarStockAlmacenes:async(p)=>{
        await InsertarStockAlmacen(p);

    },
    eliminarAlmacen: async(p) =>{
        await EliminarAlmacen(p);
    },

}));