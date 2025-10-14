import { create } from "zustand";
import { MostrarPermisos , EliminarPermiso, MostrarPermisosDefault, InsertarPermisos, MostrarPermisosGlobales, MostrarPermisosConfiguracion} from "../supabase/crudPermisos";

export const usePermisosStore = create((set, get) => ({
    dataPermisos: [],
    selectModulosP: [],
    setSelectModulosP: (p) => {
        set({selectModulosP: p})
    },
    mostrarPermisos: async (p) => {
        const response = await MostrarPermisos(p);
        set({dataPermisos: response})
        return response;
    },
    mostrarPermisosDefault: async () => {
        const response = await MostrarPermisosDefault();
        return response;    

    },
    eliminarPermisos: async (p) => await EliminarPermiso(p),
    toggleModule: (moduleId) =>{
        const {selectModulosP} = get()
        const updateModules = selectModulosP.includes(moduleId) ? 
        selectModulosP.filter((id) => id !== moduleId) : 
        [...selectModulosP, moduleId];
        set({selectModulosP: updateModules})
    },
    actualizarPermisos: async(p) =>{
        //await EliminarPermiso(p);
        //await InsertarPermisos(p);

    },
    dataPermisosGlobales: [],
    dataPermisosConfiguracion: [],
    mostrarPermisosGlobales: async(p) =>{
        const response = await MostrarPermisosGlobales(p);
        set({dataPermisosGlobales: response});
        return response;
    },
    mostrarPermisosConfiguracion: async(p) =>{
        const response = await  MostrarPermisosConfiguracion(p);
        set({dataPermisosConfiguracion: response})
        return response;


    }
}))