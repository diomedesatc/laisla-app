import { create } from "zustand"
import {InsertarVentas } from "../index"

export const useVentasStore = create((set)=>({
    
    dataalmacen: [],
    insertarVentas:async(p)=>{
        await InsertarVentas(p);

    },
}));