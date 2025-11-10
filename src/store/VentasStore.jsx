import { create } from "zustand"
import {InsertarVentas, EliminarVentasIncompletas, MostrarVentas, useClientesStore, ConfirmarVenta, EliminarVenta } from "../index"
import { toast } from "sonner";

const initialState = {
    items: [],
    total: 0,
    statePantallaCobro: false,
    tipoDeCobro: "",
    stateMetodosPago: false,    
    idventa: 0,
}

export const useVentasStore = create((set, get)=>({
    ...initialState,
    dataVentas: [],
    porcentajeCambio: 0,
    insertarVentas:async(p)=>{
        const result = await InsertarVentas(p);
        set({idventa: result?.id});
        return result;

    },
    eliminarventasIncompletas: async(p)=>{
        await EliminarVentasIncompletas(p);

    },
    mostrarVentas: async(p) =>{       
        const response = await MostrarVentas(p);
        const newId = response?.id ? response?.id : 0;
        set({ dataVentas: response})
        set({idventa: newId})
        return response;

    },
    resetState: () => {
                    const {selectClienteProveedor} = useClientesStore.getState();
                    selectClienteProveedor([]);
                    set(initialState);
    },
    
    setStatePantallaCobro: (p) => set((state) =>{
        if(p.data?.length === 0){
            toast.warning("No puedes cobrar si no hay productos ingresados.");
                return{
                       state,
            }
        }else{
            return {
                        statePantallaCobro: !state.statePantallaCobro,
                        tipoDeCobro: p.tipoDeCobro
                    }
                }
    }),
    
    setStateMetodosPago:() => set((state) => ({stateMetodosPago: !state.stateMetodosPago})),
    confirmarVenta: async(p) =>{
        console.log(p)
        const response = await ConfirmarVenta(p);
        return response;
    },
    eliminarVenta: async(p) =>{
        const {resetState} = get();
        await EliminarVenta(p);
        resetState();

    }
    
}));
