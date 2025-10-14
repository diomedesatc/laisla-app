import { useQuery } from "@tanstack/react-query";
import { UsuariosTemplate } from "../components/templates/UsuariosTemplate";
import { useEmpresaStore } from "../store/EmpresaStore";
import { useAsignacionCajaSucursalStore } from "../store/AsignacionCajaSucursalStore";
import { BarLoader } from "react-spinners";

export function Usuarios(){
    const{dataEmpresa} = useEmpresaStore();
    const {mostrarUsuarioAsignados, buscarUsuarioAsignados, buscador} = useAsignacionCajaSucursalStore();

    const {isLoading,error } = useQuery({
        queryKey: ["mostrar usuarios asignados", {id_empresa: dataEmpresa?.id}],
        queryFn: () => mostrarUsuarioAsignados({_id_empresa: dataEmpresa?.id}),
        enabled: !!dataEmpresa,
    })
     const {isLoading: isLoadingBuscarUsuarios,error: errorBuscarUsuario } = useQuery({
        queryKey: ["buscar usuarios asignados", {id_empresa: dataEmpresa?.id, buscador: buscador}],
        queryFn: () => buscarUsuarioAsignados({_id_empresa: dataEmpresa?.id, buscador: buscador}),
        enabled: !!dataEmpresa,
    })

    if(isLoading) return <BarLoader />
    if(error) return <span>{error.message}</span>
    return <UsuariosTemplate />
}