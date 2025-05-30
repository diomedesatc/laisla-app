import {supabase} from "../index";
const tabla = 'empresas'
export async function InsertarEmpresa(p){
    const {data, error} = await supabase.from(tabla).insert(p).select().maybeSingle();
    if(error){
        console.log("Error al insertar empresa:",error.message)
    }
    return data;

}

export async function MostrarEmpresaXIdUsuario(p){
    const {data} = await supabase.rpc("mostrarempresaxusuario",p).maybeSingle();
    return data;

}
