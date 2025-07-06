import { useQuery } from '@tanstack/react-query';
import {POSTemplate, useAlmacenesStore, useEmpresaStore, useProductosStores, useSucursalesStore} from '../index';

export function POS() {
    const {dataEmpresa} = useEmpresaStore();
    const{buscarProductos, buscador} = useProductosStores();
<<<<<<< HEAD
    const{obtenerIdDelProducto, dataalmacen, mostrarAlmacen} = useAlmacenesStore();
=======
    const{mostrarAlmacenPorSucursal} = useAlmacenesStore();
>>>>>>> 35546d99a8f18c2f9f187aeddfaaf697741d7796
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
<<<<<<< HEAD
        queryKey: ["mostrar almacenes por producto", {id_sucursal: sucursalesItemSelectAsignadas.id_sucursal, id_producto: productosItemSelect.id}],
        queryFn: () => obtenerAlmacenPorProducto({id_sucursal: sucursalesItemSelectAsignadas.id_sucursal, id_producto: productosItemSelect.id}),
        enabled: !!productosItemSelect,

    })


    useQuery({
        queryKey: ["mostrar almacenes.", dataalmacen ],
        queryFn: () => mostrarAlmacen({id_sucursal: sucursalesItemSelectAsignadas.id_sucursal}),
=======
        queryKey: ["mostrar almacenes por sucursal", sucursalesItemSelectAsignadas.id_sucursal],
        queryFn: () => mostrarAlmacenPorSucursal({id_sucursal: sucursalesItemSelectAsignadas.id_sucursal}),
>>>>>>> 35546d99a8f18c2f9f187aeddfaaf697741d7796

    })

    

    return(

        <POSTemplate />
    )
    
}