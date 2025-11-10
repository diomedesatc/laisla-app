import Swal from "sweetalert2";
import { supabase } from "../index"
const tabla = "usuarios"

export async function MostrarUsuarios(p){
    const {data, error} = await supabase.from(tabla).select(`*, roles(*)`).eq("id_auth", p.id_auth).maybeSingle();
    if(error){
        Swal.fire({
            title: "oops",
            icon: "error",
            text: error.message
        
        })
    }
    return data;
}

export async function InsertarAdmin(p){
    const {data, error} = await supabase.from(tabla).insert(p);
    console.log("Datos: ", data)
    if(error){
        console.log(error.message)

    }
}

export async function ObtenerIdAuthSupabase(){
    const {data:{session}} = await supabase.auth.getSession();
    if(session != null){
        const{user} = session;
        const idAuth = user.id
        return idAuth;
    }
}

export async function InsertarUsuarios(p){
    const {data, error} = await supabase.from(tabla).insert(p).select().maybeSingle();
    console.log("Datos: ", data)
    if(error){
        console.log(error.message)
        throw new Error(error.message)

    }
    return data;
}

export async function InsertarCredencialesUser(p){
    console.log(p)
    const {data, error} = await supabase.rpc("crearcredencialesuser",p);
    if(error){
        console.log(error.message)
        throw new Error(error.message)
    }

    return data;
}


export async function EliminarUsuario(p){
  const {data, error} = await supabase.from(tabla).delete().eq("id",p.id); 
  if(error){
    console.log(error.message)
    throw new Error(error.message);
  }
  return data;  
}

