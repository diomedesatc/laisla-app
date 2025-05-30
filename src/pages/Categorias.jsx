import { useQuery } from '@tanstack/react-query'
import {CategoriasTemplate, useCategoriasStores, useEmpresaStore} from '../index'

export function Categorias(){
    const {mostrarCategorias} = useCategoriasStores();
    const {dataEmpresa} = useEmpresaStore();
    const {} = useQuery({
        queryKey:["mostrar categorias", dataEmpresa?.id], 
        queryFn: () => mostrarCategorias({id_empresa: dataEmpresa?.id})
    })
    return(
        <CategoriasTemplate />

    )
}