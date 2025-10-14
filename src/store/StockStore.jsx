import { create } from "zustand";
import { InsertarStock, MostrarStockXAlmacenYProducto } from "../supabase/crudStock";

export const useStockStore = create((set, get) => ({
    insertarStock: async (p) => {
        await InsertarStock(p)
    },
    dataStockXAlmacenYProducto: [],
    mostrarStockXAlmacenYProducto: async(p) =>{
        const response = MostrarStockXAlmacenYProducto(p);
        set({dataStockXAlmacenYProducto: response})
        return response;
    }

}))