import {supabase} from "../index";
const tabla = 'empresas'
export async function InsertarEmpresa(p){
    const {data, error} = await supabase.from(tabla).insert(p).select().maybeSingle();
    return data;

}