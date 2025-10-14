import { supabase } from '../index';
import Swal from "sweetalert2"
const tabla = 'almacen';

export async function InsertarStockAlmacen(p){
    const{ error } = await supabase.from(tabla).insert(p);
    if (error){
        throw new Error(error.message);
    }
}

export async function InsertarAlmacen(p){
    const {error} = await supabase.from(tabla).insert(p);
    if(error){
        throw new Error(error.message);

    }
}

export async function EditarAlmacen(p){
    const {error} = await supabase.from(tabla).update(p).eq("id", p.id)
    if(error){
        throw new Error(error.message);

    }
}

export async function MostrarAlmacenes(p){
    const {data, error} = await supabase
    .from(tabla)
    .select()
    .eq("id_sucursal", p.id_sucursal)

    if(error){
        throw new Error(error.message);
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
        throw new Error(error.message);
    }
    return data;

}

export async function EliminarAlmacen(p){
    const {error} = await supabase.from(tabla).delete().eq("id", p);
    if (error){
        throw new Error(error.message);
    }
}

export async function MostrarAlmacenesXEmpresa(p){
    const {data, error} = await supabase.from("sucursales").select(`*, almacen(*)`).eq("id_empresa", p.id_empresa);
    if(error){
        throw new Error(error.message);
    }
    return data;
}

export async function MostrarAlmacenPorSucursal(p){
    const {data, error} = await supabase.from(tabla).select().eq("id_sucursal", p.id_sucursal)
    if(error){
        throw new Error(error.message)
    }
    return data;
}