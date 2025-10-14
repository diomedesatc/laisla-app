import styled from "styled-components";
import { SelectList } from "../../ui/list/SelectList";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useModulosStore } from "../../../store/ModulosStore";
import { useRolesStore } from "../../../store/RolesStore";
import { Check } from "../../ui/toggles/Check";
import { usePermisosStore } from "../../../store/PermisosStore";
import { useEffect } from "react";
import { useAsignacionCajaSucursalStore } from "../../../store/AsignacionCajaSucursalStore";
import { BarLoader } from "react-spinners";

export function PermisosUser(){
    const {mostrarModulos} = useModulosStore();
    const{mostrarRoles, selectRolesItem, setSelectRolesItem} = useRolesStore();
    const {mostrarPermisos, toggleModule, selectModulosP, setSelectModulosP, mostrarPermisosDefault, actualizarPermisos} = usePermisosStore();
    const {accion, selectItem: selectItemAsignaciones} = useAsignacionCajaSucursalStore();



    const{data: dataModulos, isLoading: isLoadingModulos, error: erroModulos} = useQuery({
        queryKey: ["mostrar modulos"],
        queryFn: mostrarModulos
    })

    const {data: dataRoles, isLoading: isLoadingRoles, error: errorRoles} = useQuery({
        queryKey: ["mostrar roles"],
        queryFn: mostrarRoles
    })

    const {data: dataPermisosDefault, isLoading: isLoadingPermisosDefault } = useQuery({
        queryKey: ["mostrar permisos default"],
        queryFn: mostrarPermisosDefault
    })

    const {data: dataPermisos, isLoading: isLoadingPermisos} = useQuery({
        queryKey: ["mostrar permisos"],
        queryFn: () => {
            mostrarPermisos({id_usuario: selectItemAsignaciones?.id_usuario})
        },
        enabled: !!selectItemAsignaciones
    })

    const mutation = useMutation({
        mutationKey: ["actualizar permisos"],
        mutationFn: () => actualizarPermisos(),
    })

    useEffect(() => {
        if(accion === "Nuevo"){
            const permisosPorRol = dataPermisosDefault?.filter((permiso) => permiso.id_rol === selectRolesItem?.id).map((permiso) => permiso.id_modulo) || [];
            setSelectModulosP(permisosPorRol)
        }
    }, [selectRolesItem, setSelectModulosP, dataPermisosDefault]);

    const isLoading = isLoadingModulos || isLoadingPermisosDefault || isLoadingRoles || isLoadingPermisos;

    if(isLoading) return <BarLoader />
    return(
        <Container>
            <Title>Permisos</Title>
            <label>Tipo</label>
            <SelectList data={dataRoles} itemSelect={selectRolesItem} onSelect={setSelectRolesItem} displayField="nombre"/>
            <List>
                {
                    dataModulos?.map((module) =>(
                        <ListItem key={module.id}>
                            <Check checked={selectModulosP.includes(module.id)} onChange={() => toggleModule(module?.id)}/>
                            <Label>{module.nombre}</Label>
                        </ListItem>
                    ))
                }

            </List>

        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1.5rem;
    border-left: 1px dashed ${({theme}) => theme.text};
    
`

const Title = styled.span`
    font-size: 1.5rem;
    text-align: center;
`

const List = styled.ul`
    list-style: none;
    padding: 0;
`

const ListItem = styled.li`
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
`

const Label = styled.span`
    font-size: 1rem;
    color: #555;
    margin-left: 15px;
`