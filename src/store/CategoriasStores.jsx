import { create } from "zustand";
import {BuscarCategorias, EditarCategorias, EliminarCategorias, InsertarCategorias, MostrarCategorias} from '../index'

export const useCategoriasStores = create((set, get) =>({
    buscador: "",
    setBuscador: (p) => {
        set({ buscador: p })
    },
    dataCategorias: [],
    categoriaItemSelect: [],
    parametros: {},
    mostrarCategorias: async (p) =>{
        const response = await MostrarCategorias(p);
        set({parametros: p})
        set({dataCategorias: response})
        set({categoriaItemSelect:response[0]})

        return response;
    },

    selectCategoria:(p) =>{
        set({categoriaItemSelect:p})
    },
    insertarCategorias: async(p, file) =>{
        await InsertarCategorias(p,file);
        const {mostrarCategorias} = get();
        const{parametros} = get();
        set(mostrarCategorias(parametros));
    },
    eliminarCategorias: async(p) =>{
        await EliminarCategorias(p);
        const {mostrarCategorias} = get();
        const{parametros} = get();
        set(mostrarCategorias(parametros));

    },
    editarCategorias: async(p, fileold, filenew) =>{
        await EditarCategorias(p, fileold, filenew);
        const {mostrarCategorias} = get();
        const{parametros} = get();
        set(mostrarCategorias(parametros));

    },
    buscarCategorias: async(p) =>{
        const response = await BuscarCategorias(p);
        set({dataCategorias: response});
        return response
    }

}))