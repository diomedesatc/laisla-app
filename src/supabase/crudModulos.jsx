import { supabase } from "../index"
import Swal from "sweetalert2";
const tabla = "modulos"

export async function MostrarModulos(){
    const {data, error} = await supabase.from(tabla).select().neq("etiqueta", "#default");
    if (error){
        console.log("Error en el crud de modulos!")
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message
    });
        return;
    }
    return data;
}