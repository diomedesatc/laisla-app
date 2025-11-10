import styled from "styled-components";
import { v } from "../../../styles/variables";
import {
  InputText,
  Btn1,
  useSucursalesStore,
  ConvertirCapitalize,
  useEmpresaStore,
  useProductosStore,
  useAlmacenesStore,
} from "../../../index";
import { useForm } from "react-hook-form";
import { BtnClose } from "../../ui/buttons/BtnClose";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useMovStockStore } from "../../../store/MovStockStore";
import { BuscadorList } from "../../ui/list/BuscadorList";
import { SelectList } from "../../ui/list/SelectList";
import { useFormattedDate } from "../../../hooks/useFormattedDate";
import { useStockStore } from "../../../store/StockStore";
import {RadioChecks} from "../../ui/toggles/RadioChecks";
export function RegistrarInventario({onClose}) {
  const queryClient = useQueryClient();
  const fechaActual = useFormattedDate();

  const { dataEmpresa } = useEmpresaStore();
  const { tipo, insertarMovStock,setTipo } = useMovStockStore();
  const {
    register,
    formState: { errors },
    handleSubmit,reset
  } = useForm();
  const {
    buscador,
    buscarProductos,
    selectProductos,
    setBuscador,
    productosItemSelect,
  } = useProductosStore();
  const { mostrarStockXAlmacenYProducto, editarStock } = useStockStore();
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
  const { mostrarSucursales, selectSucursal, sucursalesItemSelect } =
    useSucursalesStore();
  const { data: dataSucursales, isLoading: isLoadingSucursal } = useQuery({
    queryKey: ["mostrar sucursales", { id_empresa: dataEmpresa?.id }],
    queryFn: () =>
      mostrarSucursales({
        id_empresa: dataEmpresa?.id,
      }),
    enabled: !!dataEmpresa,
  });
  const { mostrarAlmacenesXSucursal, setAlmacenItemSelect, almacenItemSelect } =
    useAlmacenesStore();
  const { data: dataAlmacenes, isLoading: isLoadingAlmacenes } = useQuery({
    queryKey: [
      "mostrar almacenes x sucursal",
      { id_sucursal: sucursalesItemSelect.id },
    ],
    queryFn: () =>
      mostrarAlmacenesXSucursal({
        id_sucursal: sucursalesItemSelect.id,
      }),
    enabled: !!dataSucursales,
  });
  const { data: dataStock, isLoading: isLoadingStockXAlmacenYProducto } =
    useQuery({
      queryKey: [
        "mostrar StockXAlmacenYProducto",
        {
          id_almacen: almacenItemSelect?.id,
          id_producto: productosItemSelect?.id,
        },
      ],
      queryFn: () =>
        mostrarStockXAlmacenYProducto({
          id_almacen: almacenItemSelect?.id,
          id_producto: productosItemSelect?.id,
        }),
      enabled: !!dataSucursales,
    });

  const insertar = async (data) => {
   
    const pMovimientoStock = {
      id_almacen: almacenItemSelect?.id,
      id_producto: productosItemSelect?.id,
      tipo_movimiento: tipo,
      cantidad: parseFloat(data.cantidad),
      fecha: fechaActual,
      detalle: data.detalle ? data.detalle : "registro de inventario manual",
      origen: "inventario",
    };
    console.log("pMovimientoStock",pMovimientoStock)
    const pStock = {
      _id: dataStock?.id,
      cantidad: parseFloat(data.cantidad),
    };
    await insertarMovStock(pMovimientoStock);
    await editarStock(pStock, tipo);
  };
  const { isPending, mutate: doInsertar } = useMutation({
    mutationKey: ["insertar movimiento stock"],
    mutationFn: insertar,
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
    onSuccess: () => {
      toast.success("Registro guardado correctamente");
       queryClient.invalidateQueries(["buscar productos"]);
       resetFuction()
    },
  });

  const handlesub = (data) => {
    doInsertar(data);
  };
  const resetFuction =()=>{
       reset()
       setTipo("ingreso")

  }
  const isLoading = isLoadingSucursal || isLoadingAlmacenes;
  if (isLoading) {
    return <span>cargando almacenes...</span>;
  }
  // if (error) {
  //   return <span>error...{error.message} </span>;
  // }
  return (
    <Container>
      {isPending ? (
        <span>Guardando...🔼</span>
      ) : (
        <div className="sub-contenedor">
          <RadioChecks />
          <div className="headers">
            
            <section>
              <h1>
                {tipo == "ingreso" ? "REGISTRAR ENTRADA" : "REGISTRAR SALIDA"}
              </h1>
            </section>

            <section>
              <BtnClose funcion={onClose} />
            </section>
          </div>

          <form className="formulario" onSubmit={handleSubmit(handlesub)}>
            <section className="form-subcontainer">
              <BuscadorList
                data={dataproductos}
                onSelect={selectProductos}
                setBuscador={setBuscador}
              />
              <span>
                Producto:{" "}
                <strong>
                  {productosItemSelect?.nombre
                    ? productosItemSelect?.nombre
                    : "-"}{" "}
                </strong>
              </span>
              <span>
                Stock:{" "}
                <strong>{dataStock?.stock ? dataStock?.stock : "-"} </strong>
              </span>
              <ContainerSelector>
                <label>Sucursal:</label>
                <SelectList
                  data={dataSucursales}
                  itemSelect={sucursalesItemSelect}
                  onSelect={selectSucursal}
                  displayField="nombre"
                />
              </ContainerSelector>
              <ContainerSelector>
                <label>Almacen:</label>
                <SelectList
                  data={dataAlmacenes}
                  itemSelect={almacenItemSelect}
                  onSelect={setAlmacenItemSelect}
                  displayField="nombre"
                />
              </ContainerSelector>

              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    type="number"
                    placeholder="cantidad"
                    {...register("cantidad", {
                      required: true,
                    })}
                  />
                  <label className="form__label">Cantidad</label>
                  {errors.cantidad?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    type="text"
                    placeholder="detalle"
                    {...register("detalle")}
                  />
                  <label className="form__label">Detalle</label>
                </InputText>
              </article>
              <Btn1
                disabled={!productosItemSelect?.nombre}
                icono={<v.iconoguardar />}
                titulo="Guardar"
                bgcolor="#F9D70B"
              />
            </section>
          </form>
        </div>
      )}
    </Container>
  );
}
const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  .sub-contenedor {
    position: relative;
    width: 500px;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.body};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;
    max-height: 80vh;
    overflow-y: auto;

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h1 {
        font-size: 30px;
        font-weight: 700;
        text-transform: uppercase;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .formulario {
      .form-subcontainer {
        gap: 20px;
        display: flex;
        flex-direction: column;
        .colorContainer {
          .colorPickerContent {
            padding-top: 15px;
            min-height: 50px;
          }
        }
      }
    }
  }
`;

export const ContainerSelector = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  position: relative;
`;