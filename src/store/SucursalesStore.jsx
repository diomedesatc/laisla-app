import { create } from "zustand"
import { MostrarSucursales, MostrarSucursalesPorUsuario } from "../index"

export const useSucursalesStore = create((set)=>({
    sucursalesItemSelect: [],
    selectSucursal: (p) =>{
        set({sucursalesItemSelect:p})
    },
    dataSucursales:[],
    dataSucursalesAsignadas: [],
    sucursalesItemSelectAsignadas: [],
    mostrarSucursales:async(p)=>{
        const response = await MostrarSucursales(p);
        set({dataSucursales:response})
        set({sucursalesItemSelect:response[0]})
        return response;

    },
    mostrarSucursalesPorUsuario: async(p)=>{
        const response = await MostrarSucursalesPorUsuario(p);
        set({dataSucursalesAsignadas: response});
        set({sucursalesItemSelectAsignadas: response[0]})
<<<<<<< HEAD
        console.log("Respuesta del Store sucursales", sucursalesItemSelectAsignadas)
=======
>>>>>>> 35546d99a8f18c2f9f187aeddfaaf697741d7796
        return response;
    }

}))