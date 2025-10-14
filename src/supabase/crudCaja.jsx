import { supabase } from '../index';
const tabla = 'caja';

export async function MostrarCajaXSucursal(p){
    const {data, error} = await supabase.from(tabla).select().eq("id_sucursal", p.id_sucursal);
    
    return data;
}

export async function InsertarCaja(p){
    const {data, error} = await supabase.from(tabla).insert(p);
    if(error){
        throw new Error(error.message);
    }

    return data;
}

export async function EditarCaja(p){
    const { error} = await supabase.from(tabla).update(p).eq("id", p.id);
    if(error){
        throw new Error(error.message)
    }

}

export async function EliminarCaja(p){
    const {error} = await supabase.from(tabla).delete(p).eq("id",p.id);
    if(error){
        throw new Error(error.message)
    }
}
