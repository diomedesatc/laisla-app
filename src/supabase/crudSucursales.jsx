import { supabase } from "../index"
import Swal from "sweetalert2";
const tabla = "sucursales"

export async function MostrarSucursales(p){
    const {data, error} = await supabase.from(tabla).select().eq("id_empresa", p.id_empresa);
    if (error){
        console.log("Error en el crud de sucursales!")
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message
    });
        return;
    }
    return data;
}