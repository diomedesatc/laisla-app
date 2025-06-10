import { supabase } from '../index';
import Swal from "sweetalert2"
const tabla = 'categorias';

export async function InsertarCategorias(p, file){
    const {error, data} = await supabase.rpc("insertarcategorias", p)
    if (error){
        console.log("Error en el crud de categorias!")
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message
        });
        return;
    }


    if(file instanceof File){
        const nuevo_id = data;
        const urlImagenData = await subirImagen(nuevo_id, file);

        if(urlImagenData && urlImagenData.publicUrl){
            const pIconoeditar = {
                icono: urlImagenData.publicUrl,
                id: nuevo_id,
            };

            await EditarIconoDeCategoria(pIconoeditar)
        }
    }
}

async function subirImagen(idcategoria, file){

    if(!(file instanceof File)){
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El archivo proporcionado no es válido.",
    });
    return null; // Retorna null si el archivo no es válido
  }

    const fileExt = file.name.split('.').pop();    
    const ruta = `categorias/${idcategoria}.${fileExt}`;
    const { data, error } = supabase.storage
    .from('imagenes')
    .upload(ruta, file, {
        cacheControl: '0',
        upsert: true
    });

     const { data: urlimagen } = supabase.storage.from('imagenes').getPublicUrl(ruta);

  if (urlimagen) {
    return urlimagen; // Esto contendrá { publicUrl: '...' }
  } else {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo obtener la URL pública de la imagen.",
    });
    return null;
  }

}

async function EditarIconoDeCategoria(p){
    const {error} = await supabase.from('categorias').update(p).eq("id", p.id);
    
    if (error){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message
        });
        return;
    };

}

export async function MostrarCategorias(p){
    const{data} = await supabase.from(tabla).select().eq("id_empresa", p.id_empresa).order("id",{ascending: false});

    return data;

}

export async function BuscarCategorias(p) {
    const{data} = await supabase.from(tabla).select().eq("id_empresa",p.id_empresa).ilike("nombre","%"+p.descripcion+"%")

    return data;
    
}

export async function EliminarCategorias(p) {
    const {error} = await supabase.from(tabla).delete().eq("id", p.id);
    if (error){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message
        });
        return;
    };

    if(p.icono != "-"){
        const ruta = "categoria/"+p.id;
        await supabase.storage.from("imagenes").remove([ruta])
    }
    
}


export async function EditarCategorias(p, fileOld, fileNew) {
    console.log("Datos a editar: ", p)
    const{error} = await supabase.rpc("editarcategorias", p);
    if (error){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message
        });
        return;
    };

    if(fileNew != '-' && fileNew.size!=undefined){
        if(fileOld != '-'){
            await EditarIconosStorage(p._id, fileNew)
        }
        else{
            const dataImagen = await subirImagen(p._id, fileNew);
            const pIconoeditar = {
            icono: dataImagen.publicUrl,
            id: p._id
        };

        await EditarIconoDeCategoria(pIconoeditar)
            
        }

    }

    
}

export async function EditarIconosStorage(id, file) {
    const ruta = "categorias/"+ id;
    await supabase.storage.from("imagenes").update(ruta, file, {
        cacheControl: "0",
        upsert:true
    })
    
}
