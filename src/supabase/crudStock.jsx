import { supabase } from "./supabase.config";
const tabla = 'stock'


export async function InsertarStock(p){
    const {data, error} = await supabase.from(tabla).insert(p)
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