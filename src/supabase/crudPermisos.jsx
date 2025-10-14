import { supabase } from "./supabase.config";
const tabla = "permisos";


export async function MostrarPermisos(p){
    const {data} = await supabase.from(tabla).select(`*, modulos(*)`).eq("id_usuario", p.id_usuario);
    return data;
}
export async function MostrarPermisosConfiguracion(p){
    const { data } = await supabase
    .from(tabla)
    .select(`*, modulos!inner(*)`)
    .eq("modulos.etiqueta", "#configuracion")
    .eq("id_usuario", p.id_usuario);
  return data;
}
export async function MostrarPermisosDefault(p){
    const {data} = await supabase.from("permisos_default").select();
    return data;
}

export async function InsertarPermisos(p){
    const {data, error} = await supabase.from(tabla).insert(p).select();
    if(error){
        console.log("Error intentando insertar registro" , error.message);
        throw new Error(error.message);
    }
    return data;
}

export async function EditarPermiso(p){
    const {data} = await supabase.from(tabla).update().eq("id", p.id);
}

export async function EliminarPermiso(p){
    const { error } = await supabase.from(tabla).delete().eq("id_usuario", p.id_usuario);
    if(error){
        throw new Error(error.message);
    }

}

export async function MostrarPermisosGlobales(p){
    const {data, error} = await supabase.from(tabla).select("*, modulos(*)").eq("id_usuario",p.id_usuario);
    if(error){
        console.log(error.message)
        throw new Error(error.message)
    }

    return data;
}