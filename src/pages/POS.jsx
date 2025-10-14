import { useQuery } from '@tanstack/react-query';
import {POSTemplate, SpinnerSecundario, useAlmacenesStore, useEmpresaStore, useMetodosDePagoStore, useProductosStore, useSucursalesStore, useVentasStore} from '../index';
import { useCajaStore } from '../store/CajaStore';
import { useCierreCajaStore } from '../store/CierreCajaStore';
import { PantallaCajaApertura } from '../components/organismos/POSDesing/CajaDesign/PantallaCajaApertura';

export function POS() {
    const {dataEmpresa} = useEmpresaStore();
    const{buscarProductos, buscador} = useProductosStore();
    const{obtenerIdDelProducto, dataalmacen, mostrarAlmacen} = useAlmacenesStore();
    const{sucursalesItemSelectAsignadas} = useSucursalesStore();
    const {mostrarVentas, dataVentas} =  useVentasStore();
    const {mostrarCajaxSucursal, cajaSelectItem} = useCajaStore();
    const {mostrarCierreCaja} = useCierreCajaStore();


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
    
    const{mostrarMetodosPago} = useMetodosDePagoStore();
    
    

    /*useQuery({
        queryKey: ["mostrar almacenes por producto", {id_sucursal: sucursalesItemSelectAsignadas.id_sucursal, id_producto: productosItemSelect.id}],
        queryFn: () => obtenerAlmacenPorProducto({id_sucursal: sucursalesItemSelectAsignadas.id_sucursal, id_producto: productosItemSelect.id}),
        enabled: !!productosItemSelect,

    })*/


    /*useQuery({
        queryKey: ["mostrar almacenes.", dataalmacen ],
        queryFn: () => mostrarAlmacen({id_sucursal: sucursalesItemSelectAsignadas.id_sucursal}),

    })*/

    const{isLoading, error}= useQuery({
        queryKey: ["mostrar ventas", sucursalesItemSelectAsignadas?.id_sucursal,],
        queryFn: () => mostrarVentas({id_sucursal: sucursalesItemSelectAsignadas?.id_sucursal}),
        enabled: !!sucursalesItemSelectAsignadas
    })

    const {data: dataCaja} = useQuery({
        queryKey: ["mostrar caja por sucursal", {id_sucursal: sucursalesItemSelectAsignadas?.id_sucursal}],
        queryFn: () => mostrarCajaxSucursal({id_sucursal: sucursalesItemSelectAsignadas?.id_sucursal}),
        enabled: !!dataEmpresa,
        refetchOnWindowFocus: false
    })

    const {isLoading: isLoadingCierreCaja, data: dataCierreCaja, error: errorCierreCaja} = useQuery({
        queryKey: ["mostrar cierre de caja", {id_caja: cajaSelectItem?.id}],
        queryFn: () => mostrarCierreCaja({id_caja: cajaSelectItem?.id}),
        enabled: !!cajaSelectItem
    })

    const{data: dataMetodosPago} = useQuery({
        queryKey: ["mostrar metodos de pago"],
        queryFn: () => mostrarMetodosPago({id_empresa: dataEmpresa?.id}),
        enabled: !!dataEmpresa
    })

    //Mostrar spinner mientras carga la caja


    if(isLoadingCierreCaja){
        return <SpinnerSecundario  />
    }
    //Manejar error

    if(errorCierreCaja){
        return <span>Error... {errorCierreCaja.message}</span>
    }
    
    if(!dataCierreCaja){
        if(dataCierreCaja === null){
            return <PantallaCajaApertura />
        }
    }

    if(dataCierreCaja != null){
        return <POSTemplate />

    }

    

    
    
}