import { useQuery } from '@tanstack/react-query';
import {POSTemplate, SpinnerSecundario, useAlmacenesStore, useEmpresaStore, useMetodosDePagoStore, useProductosStore, useSucursalesStore, useVentasStore} from '../index';
import { useCajaStore } from '../store/CajaStore';
import { useCierreCajaStore } from '../store/CierreCajaStore';
import { PantallaCajaApertura } from '../components/organismos/POSDesing/CajaDesign/PantallaCajaApertura';
import { useStockStore } from '../store/StockStore';

export function POS() {
    const {dataEmpresa} = useEmpresaStore();
    const{buscarProductos, buscador, productosItemSelect} = useProductosStore();
    const{mostrarAlmacenesXSucursal, dataalmacen, mostrarAlmacen, almacenItemSelect} = useAlmacenesStore();
    const{sucursalesItemSelectAsignadas} = useSucursalesStore();
    const {mostrarVentas, dataVentas} =  useVentasStore();
    const {mostrarCajaxSucursal, cajaSelectItem} = useCajaStore();
    const {mostrarCierreCaja} = useCierreCajaStore();
    const {mostrarStockXAlmacenesXProducto} = useStockStore();


    useQuery({
        queryKey: ["buscar productos", buscador],
        queryFn: () => buscarProductos({
                id_empresa: dataEmpresa?.id, buscador: buscador
            })
        ,
        enabled: !!dataEmpresa,
        refetchOnWindowFocus: false, 
    }); 
    
    const{mostrarMetodosPago} = useMetodosDePagoStore();

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

    const {isLoading: isLoadingAlmacenes } = useQuery({
        queryKey: ["mostrar almacenes"],
        queryFn: () => mostrarAlmacenesXSucursal({id_sucursal: sucursalesItemSelectAsignadas?.id_sucursal}),
        enabled: !!dataEmpresa
    })

    //Consultar stock por producto y almacenes
    const {isLoading: isLoadingPA} = useQuery({
        queryKey: ["mostrar Stock X Almacenes X Producto" , {id_producto:productosItemSelect?.id, id_almacen: almacenItemSelect?.id}],
        queryFn: () => mostrarStockXAlmacenesXProducto({id_producto:productosItemSelect?.id, id_almacen: almacenItemSelect?.id})

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