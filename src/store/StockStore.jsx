import { create } from "zustand";
import { EditarStock, InsertarStock, MostrarStockXAlmacenesYProducto, MostrarStockXAlmacenYProducto } from "../supabase/crudStock";

export const useStockStore = create((set, get) => ({
    stateModal: false,
    setStateModal: (p) => {
        set({stateModal : p})
    },
    insertarStock: async (p) => {
        await InsertarStock(p)
    },
    dataStockXAlmacenYProducto: [],
    mostrarStockXAlmacenYProducto: async(p) =>{
        const response = await MostrarStockXAlmacenYProducto(p);
        set({dataStockXAlmacenYProducto: response})
        return response;
    },
    dataStockXAlmacenesXProducto: [],
    mostrarStockXAlmacenesXProducto: async(p) =>{
        const response = await MostrarStockXAlmacenesYProducto(p)
        set({dataStockXAlmacenesXProducto: response})
        return response;
    },
    editarStock: async(p, tipo) => {
        await EditarStock(p, tipo);
    }

}))