import { supabase } from "../index"
import Swal from "sweetalert2";
const tabla = "tipo_documento"

export async function MostrarTipoDocumentos(p){

    const {data} = await supabase
    .from(tabla)
    .select()
    .eq("id_empresa", p.id_empresa);

    return data;
}