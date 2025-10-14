import { create } from "zustand";
import { MostrarCierraCajaAperturada, AperturaCierreCaja, InsertarIngresoSalidaCaja, CerrarTurnoCaja } from "../supabase/crudCierreCaja";

export const useCierreCajaStore = create((set) =>({
    stateIngresoSalida: false,
    setStateIngresoSalida: (p) => set({stateIngresoSalida: p}),

    stateConteoCaja: false,
    setStateConteoCaja: (p) => set({stateConteoCaja: p}),

    
    stateCierreCaja: false,
    setStateCierreCaja: (p) => set({stateCierreCaja: p}),
    tipoRegistro: "",
    setTipoRegistro: (p) => set({tipoRegistro: p}),
    dataCierraCaja: null,
    mostrarCierreCaja: async(p) => {
        const response = await MostrarCierraCajaAperturada(p);
        set({dataCierraCaja: response});
        return response;
    },
    aperturarCaja: async(p) =>{
        const response = await AperturaCierreCaja(p);
        set({dataCierraCaja: response});
        return response;
    },
    insertarIngresosSalidasCaja: async (p) => {
        await InsertarIngresoSalidaCaja(p);
    },
    cerrarTurnoCaja: async(p) =>{
        console.log(p);
        await CerrarTurnoCaja(p);
    }





}))