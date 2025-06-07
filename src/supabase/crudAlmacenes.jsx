import { supabase } from '../index';
import Swal from "sweetalert2"
const tabla = 'almacenes';

export async function InsertarStockAlmacen(p){
    const{ error } = await supabase.from(tabla).insert(p);
    if (error){
        console.log("Error en el crud de almacenes!")
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message
        });
        return;
    }
}
