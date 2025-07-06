import { supabase } from '../index';
import Swal from "sweetalert2"
const tabla = 'almacenes';

export async function InsertarStockAlmacen(p){
    const{ error } = await supabase.from(tabla).insert(p);
    if (error){
        console.log("Error en el crud de almacenes!")
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message
        });
        return;
    }
}

export async function MostrarAlmacenes(p){
    const {data, error} = await supabase
    .from(tabla)
    .select()
    .eq("id_sucursal", p.id_sucursal)

    if(error){
        console.log("Error en el crud de Mostrar Almacenes", error.message);
    }

    return data;
}

export async function MostrarStockAlmacenPorSucursal(p){
    const {data} = await supabase.from(tabla)
    .select()
    .eq("id_sucursal", p.id_sucursal)
    .eq("id_producto", p.id_producto)
    .maybeSingle();
    return data;

}

export async function MostrarAlmacenPorProducto(p){
    
    const {error, data} = await supabase.from(tabla).select()
    .eq("id_sucursal", p.id_sucursal)
    .eq("id_producto", p.id_producto)
    .maybeSingle();  
    if(error){
        console.log("Error en el crudAlmacenes. MostrarAlmacenPorSucursal.", error.message)
    }
    return data;

}

export async function EliminarAlmacen(p){
    const {error} = await supabase.from(tabla).delete().eq("id", p);
    if (error){
        console.log("Error eliminando en el crud de almacenes!")
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message
        });
        return;
    }
}