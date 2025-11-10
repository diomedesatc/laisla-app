import styled from "styled-components";
import { RegistrarInventario } from "../components/organismos/formularios/RegistrarInventario";
import { TablaInventarios } from "../components/organismos/tablas/TablaInventarios";
import { useQuery } from "@tanstack/react-query";

import { useMovStockStore } from "../store/MovStockStore";
import { useEmpresaStore } from "../store/EmpresaStore";
import { useProductosStore } from "../store/ProductosStore";
import { CrudTemplate } from "../components/templates/crudTemplate";
export const Inventarios = () => {
  const { mostrarMovStock } = useMovStockStore();
  const { dataEmpresa } = useEmpresaStore();
  const { buscarProductos, buscador } = useProductosStore();
  const { productosItemSelect, setBuscador, selectProductos } =
    useProductosStore();
  const {
    data: dataproductos,
    isLoading: isLoadingBuscarProductos,
    error,
  } = useQuery({
    queryKey: ["buscar productos", buscador],
    queryFn: () =>
      buscarProductos({
        id_empresa: dataEmpresa?.id,
        buscador: buscador,
      }),
    enabled: !!dataEmpresa,
  });

  const { data, isLoading } = useQuery({
    queryKey: [
      "mostrar movimientos de stock",
      {
        id_empresa: dataEmpresa?.id,
        id_producto: productosItemSelect?.id,
      },
    ],
    queryFn: () =>
      mostrarMovStock({
        id_empresa: dataEmpresa?.id,
        id_producto: productosItemSelect?.id,
      }),
    enabled: !!dataEmpresa,
  });
  return (
    <CrudTemplate
      Tabla={TablaInventarios}
      FormularioRegistro={RegistrarInventario}
      title={"Inventarios"}
      data={data}
      tipoBuscador={"list"}
      dataBuscadorList={dataproductos}
      selectBuscadorList={selectProductos}
      setBuscadorList={setBuscador}
    />
  );
};
const Container = styled.div``;