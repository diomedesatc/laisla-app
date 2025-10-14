import { create } from "zustand";
import { BuscarClientes, EditarClientes, EliminarClientes, InsertarClientes, MostrarCliente } from "../supabase/crudClientes";

export const useClientesStore = create((set, get) => ({
    
    buscador: "",
    tipo: "",
    dataclienteproveedor: [],  
    parametros: {},
    clienteproveedorItemSelect: [],  
    setTipo: (p)=>{
        set({tipo: p})
    },
    setBuscador: (p) => {
        set({ buscador: p })
    },
    mostrarCliente: async(p) =>{
        const response = await MostrarCliente(p);
        set({ parametros: p})
        set({dataclienteproveedor: response});
        set({clienteproveedorItemSelect: response[0]})
        return response;
    },
    selectClienteProveedor: (p) =>{
        set({clienteproveedorItemSelect: p })
    },
    insertarClienteOProveedor: async(p) =>{
        await InsertarClientes(p);
        const { mostrarCliente } = get();
        const { parametros } = get();
        await mostrarCliente(parametros);

    },
    eliminarClienteOProveedor: async(p) =>{
        await EliminarClientes(p);
        const { mostrarCliente } = get();
        const { parametros } = get();
        await mostrarCliente(parametros);

    },
    editarClienteOProveedor: async(p) =>{
        await EditarClientes(p);
        const { mostrarCliente } = get();
        const { parametros } = get();
        await mostrarCliente(parametros);

    },
    setBuscarClienteOProveedor: async(p) =>{
        const response = await BuscarClientes(p);
        set({ dataclienteproveedor : response});
        return response;
    }
}))