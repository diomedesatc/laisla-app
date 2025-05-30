import { useQuery } from "@tanstack/react-query";
import { ConfiguracionesTemplate, useModulosStore, Spinner1 } from "../index";

export function Configuraciones(){
  const {mostrarModulos} = useModulosStore();
  const { isLoading, error} = useQuery({queryKey:"Mostrar modulos", queryFn: mostrarModulos});

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