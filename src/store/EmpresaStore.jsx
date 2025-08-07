import { create } from "zustand";
import {EditarEmpresa, EditarMonedaEmpresa, InsertarEmpresa, MostrarEmpresaXIdUsuario} from '../index'

export const useEmpresaStore = create((set) =>({    
        dataEmpresa: [],
        mostrarEmpresa: async(p)=>{
            const response = await MostrarEmpresaXIdUsuario(p);
            set({dataEmpresa: response})
            return response

            
        },
    insertarempresa: async (p) =>{
        const response = await InsertarEmpresa(p);
        console.log("Respuesta de la BASE DE DATOS: ", response)
    },
    editarEmpresa: async (p, fileold, filenew) =>{        
        await EditarEmpresa(p, fileold, filenew);
    },
    editarMonedaEmpresa: async(p) =>{        
        await EditarMonedaEmpresa(p);
    }

}));