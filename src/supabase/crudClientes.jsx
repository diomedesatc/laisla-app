import Swal from "sweetalert2";
import { supabase } from "./supabase.config";
const tabla = 'clientes_proveedores';

export async function MostrarCliente(p){
    const {data, error} = await supabase.from(tabla).select().eq("id_empresa",p.id_empresa).eq("tipo", p.tipo);
    if(error){
        return;
    }

    return data;
}

export async function BuscarClientes(p){
    const {data, error} = await supabase.from(tabla).select().eq("id_empresa",p.id_empresa).eq("tipo", p.tipo).ilike("nombres", "%"+p.buscador+"%");
    if(error){
        Swal.fire({
            title: "Error mostrando el cliente",
            text: error.message,
            icon: "error"
        })
        return;
    }

    return data;
}

export async function InsertarClientes(p){
    const {error} = await supabase.rpc("insertarclientesproveedores",p);
    if(error){
        Swal.fire({
            title: "Error insertando el cliente/proveedor",
            text: error.message,
            icon: "error"
        })
        return;
    }

}

export async function EliminarClientes(p){
    const {data, error} = await supabase.from(tabla).delete().eq("id",p.id);
    if(error){
        Swal.fire({
            title: "Error eliminando el cliente",
            text: error.message,
            icon: "error"
        })
        return;
    }
}

export async function EditarClientes(p){
    const {data, error} = await supabase.rpc("editarclientesproveedores",p);
    if(error){
        Swal.fire({
            title: "Error editando el cliente/proveedor",
            text: error.message,
            icon: "error"
        })
        return;
    }

    return data;

}