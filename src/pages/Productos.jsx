import { useQuery } from '@tanstack/react-query'
import {ProductosTemplate, Spinner1, useProductosStores, useEmpresaStore, useSucursalesStore, useCategoriasStores} from '../index'

export function Productos(){
    const {mostrarProductos, buscarProductos, buscador} = useProductosStores();
    const{mostrarSucursales} = useSucursalesStore();
    const {dataEmpresa} = useEmpresaStore();
    const{mostrarCategorias} = useCategoriasStores();
    const {isLoading, error} = useQuery({
        queryKey:["mostrar productos", dataEmpresa?.id], 
        queryFn: () => mostrarProductos({id_empresa: dataEmpresa?.id}),
        enabled: !!dataEmpresa,
        refetchOnWindowFocus: false
    })

    //Buscar productos
    const {} = useQuery({
        queryKey:["buscar productos", buscador], 
        queryFn: () => buscarProductos({id_empresa: dataEmpresa?.id, descripcion: buscador}),
        enabled: !!dataEmpresa,
        refetchOnWindowFocus: false
    })

    //Mostrar Sucursales
    useQuery({
        queryKey:["mostrar sucursales", dataEmpresa?.id], 
        queryFn: () => mostrarSucursales({id_empresa: dataEmpresa?.id}),
        enabled: !!dataEmpresa,
        refetchOnWindowFocus: false
    })
    //Mostrar Categorias

    useQuery({
        queryKey:["mostrar categorias", dataEmpresa?.id], 
        queryFn: () => mostrarCategorias({id_empresa: dataEmpresa?.id}),
        enabled: !!dataEmpresa,
        refetchOnWindowFocus: false
    })


    if(isLoading){
        return(
            <Spinner1 />
        )
    }

    if(error){
        return(
            <span>Error!</span>
        )
    }
    return(
        <ProductosTemplate />

    )
}