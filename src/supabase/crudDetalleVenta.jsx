import { supabase } from '../index';
import Swal from "sweetalert2"
const tabla = 'detalle_venta';

export async function InsertarDetalleVenta(p){
    const {error} = await supabase.from(tabla).insert(p).select();
    if (error){
<<<<<<< HEAD
        console.log("Error en el crud de insertarDetalleVenta")
=======
        console.log("Error en el crud de productos!")
>>>>>>> 35546d99a8f18c2f9f187aeddfaaf697741d7796
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
<<<<<<< HEAD
    if(error){
        console.log("Error en el crud de detalle de ventas. Funcion MostrarDetalleVenta", error.message)
    }
=======
>>>>>>> 35546d99a8f18c2f9f187aeddfaaf697741d7796
    return data;
}