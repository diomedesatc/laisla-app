import { useQuery } from '@tanstack/react-query';
import {POSTemplate, useAlmacenesStore, useEmpresaStore, useProductosStores, useSucursalesStore} from '../index';

export function POS() {
    const {dataEmpresa} = useEmpresaStore();
    const{buscarProductos, buscador} = useProductosStores();
    const{mostrarAlmacenPorSucursal} = useAlmacenesStore();
    const{sucursalesItemSelectAsignadas} = useSucursalesStore();
    const{productosItemSelect} = useProductosStores();


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
        queryKey: ["mostrar almacenes por sucursal", sucursalesItemSelectAsignadas.id_sucursal],
        queryFn: () => mostrarAlmacenPorSucursal({id_sucursal: sucursalesItemSelectAsignadas.id_sucursal}),

    })

    

    return(

        <POSTemplate />
    )
    
}