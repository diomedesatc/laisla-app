import { create } from "zustand";
import {InsertarEmpresa} from '../index'

export const useEmpresaStore = create((set) =>({
    insertarempresa: async (p) =>{
        const response = await InsertarEmpresa(p);
        console.log("Respuesta de la BASE DE DATOS: ", response)
    }
}));