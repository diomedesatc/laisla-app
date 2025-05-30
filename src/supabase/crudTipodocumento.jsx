import { supabase } from "../index"
import Swal from "sweetalert2";
const tabla = "tipo_documento"

export async function MostrarTipoDocumentos(p){

    const {data, error} = await supabase
    .from(tabla)
    .select()
    .eq("id_empresa", p.id_empresa);
    if(error){
        console.log("Error al verificar el tipo de documento:",error.message)
    }

    return data;
}