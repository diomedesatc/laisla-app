import { useQuery } from '@tanstack/react-query'
import {CategoriasTemplate, Spinner1, useCategoriasStores, useEmpresaStore} from '../index'

export function Categorias(){
    const {mostrarCategorias, buscarCategorias, buscador} = useCategoriasStores();
    const {dataEmpresa} = useEmpresaStore();
    const {isLoading, error} = useQuery({
        queryKey:["mostrar categorias", dataEmpresa?.id], 
        queryFn: () => mostrarCategorias({id_empresa: dataEmpresa?.id}),
        enabled: !!dataEmpresa,
        refetchOnWindowFocus: false
    })

    //Buscar categorias
    const {} = useQuery({
        queryKey:["buscar categorias", buscador], 
        queryFn: () => buscarCategorias({id_empresa: dataEmpresa?.id, descripcion: buscador}),
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
        <CategoriasTemplate />

    )
}