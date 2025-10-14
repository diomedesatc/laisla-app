import { create } from "zustand"
import { EditarAlmacen, EliminarAlmacen, InsertarAlmacen, InsertarStockAlmacen, MostrarAlmacenPorProducto, MostrarAlmacenPorSucursal, MostrarAlmacenes, MostrarAlmacenesXEmpresa } from "../index"

export const useAlmacenesStore = create((set)=>({
    stateAlmacen: false,
    setStateAlmacen: (p) => set({stateAlmacen: p}),
    accion: "",
    setAccion: (p) => set({accion: p}),
    almacenItemSelect: [],
    setAlmacenItemSelect: (p) => {
        set({almacenItemSelect: p})
    },
    
    dataalmacen: [],
    dataalmacenporsucursal: [],
    dataAlmacenesXSucursal: null,
    //idalmacenporproducto: null,
    mostrarAlmacen:async (p) =>{
        const response = await MostrarAlmacenes(p);
        set({dataalmacen: response});
        return response;

    },
    mostrarAlmacenesXEmpresa: async(p) => {
        const response = await MostrarAlmacenesXEmpresa(p);
        set({dataAlmacenesXSucursal: response})
        return response;
    },
    dataAlmacenSucursal: null,
    mostrarAlmacenesXSucursal: async(p) => {
        const response = await MostrarAlmacenPorSucursal(p);
        set({dataAlmacenSucursal: response})
        set({almacenItemSelect: response[0]})
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
    insertarAlmacen: async(p) =>{
        await InsertarAlmacen(p)
    },
    editarAlmacen: async(p) =>{
        await EditarAlmacen(p)
    },
    eliminarAlmacen: async(p) =>{
        await EliminarAlmacen(p);
    },

}));