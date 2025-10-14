import { useQuery } from "@tanstack/react-query";
import { ConfiguracionesTemplate, useModulosStore, Spinner1, useUsuarioStore } from "../index";
import { usePermisosStore } from "../store/PermisosStore";

export function Configuraciones(){
  const {mostrarModulos} = useModulosStore();
  const {dataUsuarios} = useUsuarioStore();
  const {mostrarPermisosConfiguracion} = usePermisosStore();
  const { isLoading, error} = useQuery({queryKey:["Mostrar modulos"], queryFn:() => mostrarPermisosConfiguracion({id_usuario: dataUsuarios?.id})});

  if(isLoading){
    return (
      <Spinner1 />
    )
  }
  if(error){
    return(
      <span>Error!</span>
    )
  }
  return(

  <ConfiguracionesTemplate />
  );
}