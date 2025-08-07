import { create } from "zustand";
import {BuscarProductos, EditarProductos, EliminarProductos, InsertarProductos, InsertarStockAlmacen, MostrarProductos} from '../index'

export const useProductosStores = create((set, get) =>({
    buscador: "",
    setBuscador: (p) => {
        set({ buscador: p })
    },
    dataProductos: [],
    productosItemSelect: [],
    parametros: {},
    dataStockAlmacen: [],
    mostrarProductos: async (p) =>{
        const response = await MostrarProductos(p);
        set({parametros: p})
        set({dataProductos: response})
        set({productosItemSelect: null})

        return response;
    },
    insertarStockAlmacen: async(p) =>{
        const response = await InsertarStockAlmacen(p);
        set({parametros: p})
        set({dataStockAlmacen: response})

        return response;
    },

    selectProductos:(p) =>{
        set({productosItemSelect:p});
    },
    insertarProductos: async(p) =>{
        const response = await InsertarProductos(p);
        const {mostrarProductos} = get();
        const{parametros} = get();
        await mostrarProductos(parametros)
        return response;
    },
    eliminarProductos: async(p) =>{
        await EliminarProductos(p);
        const {mostrarProductos} = get();
        const{parametros} = get();
        await mostrarProductos(parametros)

    },
    editarProductos: async(p, fileold, filenew) =>{
        await EditarProductos(p, fileold, filenew);
        const {mostrarProductos} = get();
        const{parametros} = get();
        await mostrarProductos(parametros)

    },
    buscarProductos: async(p) =>{
        const response = await BuscarProductos(p);
        set({dataProductos: response});
        return response
    }

}))