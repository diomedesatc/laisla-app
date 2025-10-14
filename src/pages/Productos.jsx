import { useQuery } from '@tanstack/react-query'
import {ProductosTemplate, Spinner1, useProductosStore, useEmpresaStore, useSucursalesStore, useCategoriasStores, useAlmacenesStore} from '../index'

export function Productos(){
    const {mostrarProductos, buscarProductos, buscador} = useProductosStore();
    const{mostrarSucursales, sucursalesItemSelect} = useSucursalesStore();
    const {dataEmpresa} = useEmpresaStore();
    const{mostrarCategorias} = useCategoriasStores();
    const {mostrarAlmacenPorSucursal} = useAlmacenesStore();
    const {isLoading, error} = useQuery({
        queryKey:["mostrar productos", dataEmpresa?.id], 
        queryFn: () => mostrarProductos({id_empresa: dataEmpresa?.id}),
        enabled: !!dataEmpresa,
        refetchOnWindowFocus: false
    })

    //Buscar productos
    const {} = useQuery({
        queryKey:["buscar productos", buscador], 
        queryFn: () => buscarProductos({id_empresa: dataEmpresa?.id, buscador: buscador}),
        enabled: !!dataEmpresa,
        refetchOnWindowFocus: false
    })

    //Mostrar Sucursales
    const {data: dataSucursal} = useQuery({
        queryKey:["mostrar sucursales", dataEmpresa?.id], 
        queryFn: () => mostrarSucursales({id_empresa: dataEmpresa?.id}),
        enabled: !!dataEmpresa,
        refetchOnWindowFocus: false
    })
    //Mostrar almacenes por sucursal
    const {isLoading: isLoadingAlmacenes} = useQuery({
        queryKey:["mostrar almacenes por sucursal"], 
        queryFn: () => mostrarAlmacenPorSucursal({id_sucursal: sucursalesItemSelect?.id}),
        enabled: !!dataSucursal,
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