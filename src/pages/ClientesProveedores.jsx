
import { useQuery } from "@tanstack/react-query"
import { ClientesProveedoresTemplate } from "../components/templates/ClientesProveedoresTemplate"
import { useEmpresaStore } from "../store/EmpresaStore"
import { useClientesStore } from "../store/ClientesStore";
import { useLocation } from "react-router-dom";
import { Spinner1 } from "../components/moleculas/Spinner1";

export function ClientesProveedores(){
    const {dataEmpresa} = useEmpresaStore();
    const{tipo, mostrarCliente, setBuscarClienteOProveedor, buscador} = useClientesStore();
    const location = useLocation();


    const {isLoading} = useQuery({
        queryKey: ["mostrar clientes proveedores", {dataEmpresa: dataEmpresa?.id, tipo: location.pathname === "/configuracion/clientes" ? "cliente" : "proveedor"}],
        queryFn: () => mostrarCliente(
            {
                id_empresa: dataEmpresa?.id,
                tipo: location.pathname === "/configuracion/clientes" ? "cliente" : "proveedor"
            }
        ),
        enabled: !!dataEmpresa,
        refetchOnWindowFocus: false
    });

    useQuery({
        queryKey: ["buscar clientes proveedores", {dataEmpresa: dataEmpresa?.id, tipo: location.pathname === "/configuracion/clientes" ? "cliente" : "proveedor", buscador: buscador}],
        queryFn: () => setBuscarClienteOProveedor(
            {
                id_empresa: dataEmpresa?.id,
                tipo: location.pathname === "/configuracion/clientes" ? "cliente" : "proveedor",
                buscador: buscador
            }
        ),
        enabled: !!dataEmpresa,
        refetchOnWindowFocus: false
    });

    if(isLoading){
        <Spinner1 />
    }
    return(
        <ClientesProveedoresTemplate />
    )

}
