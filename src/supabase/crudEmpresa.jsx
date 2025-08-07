import Swal from "sweetalert2";
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

export async function EditarMonedaEmpresa(p){
    const {data, error} = await supabase.from(tabla).update(p).eq("id", p.id);

    if(error){
        Swal.fire({
            icon: "error", 
            title: "Oops... no podemos editar la moneda.",
            text: error.message,
        });
        return; 
    }
}

export async function EditarLogoEmpresa(p){
    const {data, error} = await supabase.from(tabla).update(p).eq("id", p.id);

    if(error){
        Swal.fire({
            icon: "error", 
            title: "Oops... no podemos editar el logo.",
            text: error.message,
        });
        return; 
    }
}

export async function EditarEmpresa(p, fileold, filenew){
    const {data, error} = await supabase.from(tabla).update(p).eq("id", p.id);
    

    if(error){
        Swal.fire({
            icon: "error", 
            title: "Oops... no podemos editar la empresa.",
            text: error.message,
        });
        return; 
    }

    if(filenew != "-" && filenew.size != undefined){
        if(fileold != "-"){
            await EditarIconoStore(p.id, filenew);
        }else{
            const dataImagen = await SubirImagen(p.id, filenew);
            const pLogoEditar = {
                logo: dataImagen.publicUrl,
                id: p.id

            }

            await EditarLogoEmpresa(pLogoEditar);
        }
    }
}

export async function EditarIconoStore(id, file){
    const ruta = 'empresa/'+id;
    await supabase.storage.from("imagenes").update(ruta, file,{
        cacheControl:"0",
        upsert: true
    });

}

export async function SubirImagen(idempresa, file){
    const ruta = "empresa/"+idempresa;
    const {data, error} = await supabase.storage.from("imagenes").upload(ruta, file, {
        cacheControl: 0,
        upsert: true
    })

    if(error){
        Swal.fire({
            icon: "error", 
            title: "Oops... no podemos editar la empresa.",
            text: error.message,
        });
        return; 
    }   

    if(data){
        const {data: urlimagen} = supabase.storage.from("imagenes").getPublicUrl(ruta);
        return urlimagen;
    }
}
