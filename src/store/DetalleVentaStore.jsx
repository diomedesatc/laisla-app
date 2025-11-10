import { create } from "zustand"
import { EditarCantidadDetalleVenta, EliminarDetalleVentasIncompletas, InsertarDetalleVenta, MostrarDetalleVenta, Mostrartop10productosmasvendidosxmonto, Mostrartop5productosmasvendidosxcantidad } from "../index";

function calcularTotal(items){
    return items.reduce((total, item) => total + item.precio_venta * item.cantidad, 0);
}

export const useDetalleVentaStore = create((set, get)=>({
    datadetalleVenta: [],
    parametros: {},
    total: 0,
    mostrarDetalleVenta: async(p) =>{
        const response = await MostrarDetalleVenta(p);
        set({datadetalleVenta: response})
        set({total: calcularTotal(response)})
        return response;

    },
    insertarDetalleVentas:async(p)=>{
        await InsertarDetalleVenta(p);

    },
    eliminarDetalleVentasIncompletas:async(p)=>{
        await EliminarDetalleVentasIncompletas(p);
    },
    
    mostrartop5productosmasvendidosxcantidad: async (p) =>{
        const response = Mostrartop5productosmasvendidosxcantidad(p)
        return response
    },
    mostrartop10productosmasvendidosxmonto: async (p) =>{
        const response = Mostrartop10productosmasvendidosxmonto(p)
        return response
    },    
    editarCantidadDetalleVenta: async (p) => {
        await EditarCantidadDetalleVenta(p);
    },

}));
