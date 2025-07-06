import { supabase } from '../index';
import Swal from "sweetalert2"
const tabla = 'productos';

export async function InsertarProductos(p){
    const {error, data} = await supabase.rpc("insertarproductos", p)
    if (error){
        console.log("Error en el crud de productos!")
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message
        });
        return;
    }
    return data;
}

export async function MostrarProductos(p){
    const{data, error} = await supabase.rpc("mostrarproductos", {_id_empresa: p.id_empresa });
    if(error){
        console.log("Error en el crud  de mostrar  productos")
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message
        });
        return;

    }
    

    return data;

}

export async function BuscarProductos(p) {
    const{data} = await supabase.rpc("buscarproductos", {_id_empresa: p.id_empresa, buscador: p.buscador})

    return data;
    
}

export async function EliminarProductos(p) {
    const {error} = await supabase.from(tabla).delete().eq("id", p.id);
    if (error){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message
        });
        return;
    };
    
}


export async function EditarProductos(p, fileOld, fileNew) {
    console.log("Datos a editar: ", p)
    const{error} = await supabase.rpc("editarproductos", p);
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
    const ruta = "productos/"+ id;
    await supabase.storage.from("imagenes").update(ruta, file, {
        cacheControl: "0",
        upsert:true
    })
    
}
