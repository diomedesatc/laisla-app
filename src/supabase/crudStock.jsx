import { supabase } from "./supabase.config";
const tabla = 'stock'


export async function InsertarStock(p){
    const {data, error} = await supabase.from(tabla).insert(p)
    if(error){
        throw new Error(error.message)
    }
}

export async function EditarStock(p, tipo){
    const {data, error} = await supabase.rpc(tipo === "ingreso" ? "incrementarstock" : "reducirstock",p);
    if(error){
        throw new Error(error.message)
    }
}

export async function MostrarStockXAlmacenYProducto(p){
    const { data, error } = await supabase.from(tabla).select().eq("id_almacen", p.id_almacen).eq("id_producto", p.id_producto).maybeSingle();
    if(error){
        throw new Error(error.message)
    }
    return data;
}

export async function MostrarStockXAlmacenesYProducto(p){
    const {data, error} = await supabase.from(tabla).select(`*,almacen(*)`).eq("id_almacen", p.id_almacen).eq("id_producto", p.id_producto).gt("stock",0);
    if(error){
        throw new Error(error.message)
    }
    return data;
}