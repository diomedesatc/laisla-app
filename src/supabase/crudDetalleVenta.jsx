import { supabase } from '../index';
import Swal from "sweetalert2"
const tabla = 'detalle_venta';

export async function InsertarDetalleVenta(p){
    const {error} = await supabase.from(tabla).insert(p).select();
    if (error){
        console.log("Error en el crud de insertarDetalleVenta")
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message
        });
        return;
    }
};

export async function MostrarDetalleVenta(p){
    const {data, error} = await supabase.rpc("mostrardetalleventa" ,{_id_venta: p.id_venta});
    if(error){
        console.log("Error en el crud de detalle de ventas. Funcion MostrarDetalleVenta", error.message)
    }
    return data;
}