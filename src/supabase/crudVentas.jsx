import { supabase } from '../index';
import Swal from "sweetalert2"
const tabla = 'ventas';

export async function InsertarVentas(p){
    const {error, data} = await supabase.from(tabla).insert(p).select().maybeSingle();
    if (error){
        console.log("Error en el crud de productos!")
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message
        });
        return;
    }
    return data;
}
