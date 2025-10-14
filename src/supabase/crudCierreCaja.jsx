import Swal from 'sweetalert2';
import { supabase } from '../index';
const tabla = 'cierrecaja';
const tabla2 = 'ingresos_salidas_caja';


export async function MostrarCierraCajaAperturada(p){
    const {data, error} = await supabase.from(tabla).select().eq("id_caja", p.id_caja).eq("estado",0).maybeSingle();
    if(error){
        console.log(error.message);
        return;
    }
    return data;
}

export async function AperturaCierreCaja(p){
    const {error, data} = await supabase.from(tabla).insert(p).select().maybeSingle();
    if(error){
        Swal.fire({
            icon: "error",
            title: "Error cerrando la caja",
            text: error.message
        });
        return;

    }

    return data;
}

export async function InsertarIngresoSalidaCaja(p){
    const {error, data} = await supabase.from(tabla2).insert(p);
    if(error){
        Swal.fire({
            icon: "error",
            title: "Error insertando ingresos/retiros en la caja",
            text: error.message
        });
        return;
    }

}

export async function CerrarTurnoCaja(p){
    const {error, data} = await supabase.from(tabla).update(p).eq("id",p.id);
    if(error){
        throw new Error(error.message);
    }
}
