import { create } from "zustand"
<<<<<<< HEAD
import { EliminarAlmacen, InsertarStockAlmacen, MostrarAlmacenPorProducto, MostrarAlmacenes } from "../index"
=======
import { EliminarAlmacen, InsertarStockAlmacen, MostrarAlmacenPorSucursal, MostrarStockAlmacenPorSucursal } from "../index"
>>>>>>> 35546d99a8f18c2f9f187aeddfaaf697741d7796

export const useAlmacenesStore = create((set)=>({
    
    dataalmacen: [],
    dataalmacenporsucursal: [],
<<<<<<< HEAD
    //idalmacenporproducto: null,
=======
>>>>>>> 35546d99a8f18c2f9f187aeddfaaf697741d7796
    mostrarAlmacen:async (p) =>{
        const response = await MostrarAlmacenes(p);
        set({dataalmacen: response});
        return response;

    },
    
<<<<<<< HEAD
    obtenerAlmacenPorProducto:async (p) =>{
        const response = await MostrarAlmacenPorProducto(p);
        set({dataalmacenporsucursal: response});
        //set({idalmacenporproducto: response.id})
=======
    mostrarAlmacenPorSucursal:async (p) =>{
        const response = await MostrarAlmacenPorSucursal(p);
        set({dataalmacenporsucursal: response});
>>>>>>> 35546d99a8f18c2f9f187aeddfaaf697741d7796
        return response;

    },
    insertarStockAlmacenes:async(p)=>{
        await InsertarStockAlmacen(p);

    },
    eliminarAlmacen: async(p) =>{
        await EliminarAlmacen(p);
    },

}));