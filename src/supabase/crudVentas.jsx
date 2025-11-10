import { supabase } from '../index';
import Swal from "sweetalert2"
const tabla = 'ventas';

export async function InsertarVentas(p){
    console.log(p)
    const {error, data} = await supabase.from(tabla).insert(p).select().maybeSingle();

    if (error){
        throw new Error(error.message)
    }
    return data;
}

export async function EliminarVentasIncompletas(p){
    const {data, error} = await supabase.from(tabla).delete().eq("estado", "nueva").eq("id_usuario", p.id_usuario);
    if (error){
            console.log("Error en el crud de eliminar ventas incompletas!")
            
            return;
        }
        return data;

}

export async function MostrarVentas(p){
    const {data, error} = await supabase
    .from(tabla)
    .select()
    .eq("id_sucursal", p.id_sucursal)
    .eq("estado", "nueva")
    .maybeSingle();

    if(error){
        console.log("Error en mostrar las ventas.", error.message)
        return;
    }

    return data;

}

export async function ConfirmarVenta(p){
    const { data, error } = await supabase.from(tabla).update(p).eq("id", p.id).select();
    if(error){
        throw new Error(error.message)
    }
    return data;
}

export async function EliminarVenta(p){
    const { data, error } = await supabase.from(tabla).delete().eq("id",p.id);
    if(error){
        throw new Error(error.message)
    }
}