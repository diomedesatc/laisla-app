import { useQuery } from '@tanstack/react-query';
import {POSTemplate, SpinnerSecundario, useAlmacenesStore, useEmpresaStore, useProductosStores, useSucursalesStore, useVentasStore} from '../index';

export function POS() {
    const {dataEmpresa} = useEmpresaStore();
    const{buscarProductos, buscador} = useProductosStores();
    const{obtenerIdDelProducto, dataalmacen, mostrarAlmacen} = useAlmacenesStore();
    const{sucursalesItemSelectAsignadas} = useSucursalesStore();
    const{productosItemSelect} = useProductosStores();
    const {mostrarVentas, dataVentas} =  useVentasStore();


    useQuery({
        queryKey: ["buscar productos", buscador],
        queryFn: () =>{
            buscarProductos({
                id_empresa: dataEmpresa?.id, buscador: buscador
            })
        },
        enabled: !!dataEmpresa,
        refetchOnWindowFocus: false, 
    });

    useQuery({
        queryKey: ["mostrar almacenes por producto", {id_sucursal: sucursalesItemSelectAsignadas.id_sucursal, id_producto: productosItemSelect.id}],
        queryFn: () => obtenerAlmacenPorProducto({id_sucursal: sucursalesItemSelectAsignadas.id_sucursal, id_producto: productosItemSelect.id}),
        enabled: !!productosItemSelect,

    })


    /*useQuery({
        queryKey: ["mostrar almacenes.", dataalmacen ],
        queryFn: () => mostrarAlmacen({id_sucursal: sucursalesItemSelectAsignadas.id_sucursal}),

    })*/

    const{isLoading, error}= useQuery({
        queryKey: ["mostrar ventas", sucursalesItemSelectAsignadas.id_sucursal,],
        queryFn: () => mostrarVentas({id_sucursal: sucursalesItemSelectAsignadas.id_sucursal}),
        enabled: !!sucursalesItemSelectAsignadas
    })

    if(isLoading){
        return <SpinnerSecundario />
    }
    if(error){
        return <span>Error... {error.message}</span>
    }

    

    return(

        <POSTemplate />
    )
    
}