import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import {
  InputText,
  Btn1,  
  Icono,
  ConvertirCapitalize,
  useProductosStore,
  ContainerSelector,
  Switch1,
  Selector,
  useSucursalesStore,
  ListaDesplegable,
  useCategoriasStores,
  Checkbox1,
  useAlmacenesStore,
  ConvertirMinisculas,
} from "../../../index";
import { useForm } from "react-hook-form";
import { CirclePicker } from "react-color";
import { useEmpresaStore } from "../../../store/EmpresaStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import {Device} from '../../../styles/breakpoints'
import { SelectList } from "../../ui/list/SelectList";
import { useStockStore } from "../../../store/StockStore";
import { toast } from "sonner";
import { BtnClose } from "../../ui/buttons/BtnClose";

export function RegistrarProductos({
  onClose,
  dataSelect,
  accion,
}) {
  const [isChecked1, setIsChecked1] = useState(true);
  const [isChecked2, setIsChecked2] = useState(false);
  const [sevendepor, setsevendepor] = useState("Unidad");
  const [stateEnabledStock, setStateEnabledStock] = useState(false);
  const [stock, setStock] = useState("");
  const [stockMinimo, setStockMinimo] = useState("");
  const [ubicacion, setUbicacion] = useState("");

  const handleCheckboxChange = (checkboxnumber) =>{
    if(checkboxnumber == 1){
      setIsChecked1(true)
      setIsChecked2(false)
      setsevendepor("Unidad")
    }else{
      setIsChecked1(false)
      setIsChecked2(true)
      setsevendepor("Granel")
    }
  }
  const { insertarProductos, editarProductos} = useProductosStore();
  const { dataEmpresa } = useEmpresaStore();
  const [stateInventarios, setStateInventarios] = useState(true);
  const {sucursalesItemSelect, dataSucursales, selectSucursal} = useSucursalesStore();
  const [stateSucursalesLista, setStateSucursalesLista] = useState(false);
  const {dataCategorias, selectCategoria, categoriaItemSelect} = useCategoriasStores();
  const [stateCategoriasLista, setStateCategoriasLista] = useState(false);
  const {insertarStockAlmacenes, mostrarAlmacen, dataalmacen, eliminarAlmacen, dataAlmacenesPorSucursal, mostrarAlmacenesXSucursal, almacenItemSelect, setAlmacenItemSelect} = useAlmacenesStore();


  const [currentColor, setColor] = useState("#F44336");
  const [file, setFile] = useState([]);
  const ref = useRef(null);
  const [fileurl, setFileurl] = useState();
  const[idEmpresa, setIdempresa] = useState(dataSelect?.id_empresa || '' );
  const {insertarStock, mostrarStockXAlmacenYProducto} = useStockStore();

  const {data: dataStockXAlmacenProducto, error, isLoading, refetch} = useQuery({
    queryKey: ["Mostrar stock almacen por producto", {id_producto: dataSelect.id, id_almacen: almacenItemSelect?.id}],
    queryFn: ()=> mostrarStockXAlmacenYProducto({id_almacen: almacenItemSelect?.id, id_producto: dataSelect.id}),
    enabled: stateInventarios,
  })  

  const {data: dataAlmacenes, error: errorAlmacenes, isLoading: isLoadingAlmacenes} = useQuery({
    queryKey: ["mostrar almacenes por sucursal", {id_producto: dataSelect.id, id_sucursal: sucursalesItemSelect.id}],
    queryFn: () => mostrarAlmacenesXSucursal({
      id_sucursal: sucursalesItemSelect.id
    })
  })



  function elegirColor(color) {
    setColor(color.hex);
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { isPending, mutate: doInsertar } = useMutation({
    mutationFn: insertar,
    mutationKey: "insertar productos",
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      toast.success("Producto registrado correctamente.")
      cerrarFormulario()},
  });
  const handlesub = (data) => {
    doInsertar(data);
  };
  const cerrarFormulario = () => {
    onClose();
  };


  async function insertar(data) {

    if(stateInventarios){
      if(!dataStockXAlmacenProducto){
        if(data.stock.trim() === ""){
          data.stock = 0;
        }
        if(data.stock_minimo.trim() === ""){
          data.stock_minimo = 0;
        }
      }
    }
    
    if(data.precio_venta.trim() === ""){
      data.precio_venta = 0;
    }

    if(data.precio_compra.trim() === ""){
      data.precio_compra = 0;
    }

    if (accion === "Editar") {
      console.log(stateInventarios)
      const p = {
        _id: dataSelect.id,
        _nombre: ConvertirMinisculas(data.nombre),
        _precio_venta: parseFloat(data.precio_venta),
        _precio_compra: parseFloat(data.precio_compra),
        _id_categoria: categoriaItemSelect.id,
        _codigo_barras: "-",
        _codigo_interno: "-",        
        _id_empresa: dataEmpresa.id,
        _sevende_por: sevendepor,
        _maneja_inventarios: stateInventarios,
       };
      await editarProductos(p);
      if(stateInventarios){
        if(!dataStockXAlmacenProducto){
          const pStock = {
            id_almacen: almacenItemSelect?.id,
            id_producto: dataSelect?.id,
            stock: parseFloat(data.stock),
            stock_minimo:parseFloat(data.stock_minimo),
            ubicacion: data.ubicacion
          }        
          await insertarStock(pStock);
        }
      }
    } else {
      const p = {
        _nombre: ConvertirMinisculas(data.nombre),
        _precio_venta: parseFloat(data.precio_venta),
        _precio_compra: parseFloat(data.precio_compra),
        _id_categoria: categoriaItemSelect.id,
        _codigo_barras: "-",
        _codigo_interno: "-",        
        _id_empresa: dataEmpresa.id,
        _sevende_por: sevendepor,
        _maneja_inventarios: stateInventarios,
        _maneja_multiprecios: false,
      };

      const id_nuevoProducto = await insertarProductos(p);

      if(stateInventarios){
        const m = {
            id_almacen: almacenItemSelect?.id,
            id_producto: id_nuevoProducto,
            stock: parseFloat(data.stock),
            stock_minimo:parseFloat(data.stock_minimo),
            ubicacion: data.ubicacion
        }

        
        await insertarStock(m);
      }

      }
  }
  function abrirImagenes() {
    ref.current.click();
  }
  function prepararImagen(e) {
    let filelocal = e.target.files;
    let fileReaderlocal = new FileReader();
    fileReaderlocal.readAsDataURL(filelocal[0]);
    const tipoimg = e.target.files[0];
    setFile(tipoimg);
    if (fileReaderlocal && filelocal && filelocal.length) {
      fileReaderlocal.onload = function load() {
        setFileurl(fileReaderlocal.result);
      };
    }
  }
  useEffect(() => {
    if (accion === "Editar") {
      selectCategoria({
        id: dataSelect.id_categoria,
        nombre: dataSelect.categoria
      })
      dataSelect.maneja_inventarios?setStateEnabledStock(true):setStateEnabledStock(false);
      dataSelect.sevende_por === "Unidad" ? handleCheckboxChange(1) : handleCheckboxChange(0);
      dataSelect.maneja_inventarios === true ? setStateInventarios(true) : setStateInventarios(false); 
    }
  }, []);


  function checkUseInventarios(){
    if(accion == "Editar"){
      if(dataalmacen){
        if(stateInventarios === true){
          Swal.fire({
            title: "¿Estás seguro(a)?",
            text: "Si quitas el control de stock se eliminara todo el stock que tienes ingresado.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar",
          }).then(async (result) => {
            if (result.isConfirmed) {          
              setStateInventarios(!stateInventarios);
              eliminarAlmacen(dataalmacen.id);

            }
          });
      }

      }
      else{
      setStateInventarios(!stateInventarios);

      }
    }else{
      setStateInventarios(!stateInventarios);
    }

  }
  return (
    <Container>
      {isPending ? (
        <span>...🔼</span>
      ) : (
        <div className="sub-contenedor">
          <div className="headers">
            <section>
              <h1>
                {accion == "Editar"
                  ? "Editar producto"
                  : "Registrar nuevo producto"}
              </h1>
            </section>

            <section>
              <BtnClose funcion={onClose} />
            </section>
          </div>
          <form className="formulario" onSubmit={handleSubmit(handlesub)}>
              <section className="seccion1">
                <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.nombre}
                    type="text"
                    placeholder="Producto"
                    {...register("nombre", {
                      required: true,
                    })}
                  />
                  <label className="form__label">Nombre del producto</label>
                  {errors.nombre?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.precio_venta}
                    step='1'
                    type="number"
                    placeholder="Precio Venta"
                    {...register("precio_venta", {
                      required: true,
                    })}
                  />
                  <label className="form__label">Precio venta</label>
                  {errors.precio_venta?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.precio_compra}
                    step='1'
                    type="number"
                    placeholder="Costo"
                    {...register("precio_compra", {
                      required: true,
                    })}
                  />
                  <label className="form__label">Costo del producto</label>
                  {errors.precio_compra?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>
              </section>
              <section className="seccion2">
                <label>Se vende por: </label>
                <ContainerSelector>
                <label>Unidad</label>
                <Checkbox1 isChecked={isChecked1} onChange={()=> handleCheckboxChange(1)}/>
                <label>Granel</label>
                <Checkbox1 isChecked={isChecked2} onChange={()=> handleCheckboxChange(2)} />
                </ContainerSelector>
                <ContainerSelector>
                        <label>Categoria: </label>
                        <SelectList data={dataCategorias} itemSelect={categoriaItemSelect} onSelect={selectCategoria} displayField="nombre"/>
                  </ContainerSelector>
                      
                <ContainerSelector>
                  <label>Controlar stock: </label>
                  <Switch1 state={stateInventarios} setState={checkUseInventarios}/>
                </ContainerSelector>
                  {
                    stateInventarios && 
                    (<ContainerStock>
                      <ContainerSelector>
                        <label>Sucursal: </label>
                        <SelectList data={dataSucursales} displayField="nombre" itemSelect={sucursalesItemSelect} onSelect={selectSucursal}/>
                      </ContainerSelector>
                      <br></br>
                      <ContainerSelector>
                        <label>Almacen: </label>
                        <SelectList data={dataAlmacenes} itemSelect={almacenItemSelect} onSelect={setAlmacenItemSelect} displayField="nombre"/>
                      </ContainerSelector>
                      {
                        (stateEnabledStock && dataStockXAlmacenProducto) && (                          
                        <ContainerMensajeStock>
                          <span>Para editar el stock vaya a la configuracion de kardex.</span>
                        </ContainerMensajeStock>
                        )
                      }
                      <article>
                        <InputText icono={<v.iconoflechaderecha />}>
                          <input
                            disabled={!!dataStockXAlmacenProducto}
                            className="form__field"
                            value={accion === "Editar" ? dataStockXAlmacenProducto?.stock : stock}
                            step='1'
                            type="number"
                            placeholder="Stock"
                            {...register("stock")}
                            onChange={(e) => setStock(e.target.value)}
                          />
                          <label className="form__label">Stock</label>
                          {errors.stock_minimo?.type === "required" && (
                            <p>Campo requerido</p>
                          )}
                        </InputText>
                      </article>
                      <article>
                        <InputText icono={<v.iconoflechaderecha />}>
                          <input
                            disabled={!!dataStockXAlmacenProducto}
                            className="form__field"
                            value={accion === "Editar" ? dataStockXAlmacenProducto?.stock_minimo : stockMinimo}
                            step='1'
                            type="number"
                            placeholder="Stock minimo"
                            {...register("stock_minimo")}
                            onChange={(e) => setStockMinimo(e.target.value)}
                          />
                          <label className="form__label">Stock minimo</label>
                          {errors.stock?.type === "required" && (
                            <p>Campo requerido</p>
                          )}
                        </InputText>
                      </article>
                      <article>
                        <InputText icono={<v.iconoflechaderecha />}>
                          <input
                            disabled={!!dataStockXAlmacenProducto}
                            className="form__field"
                            value={accion === "Editar" ? dataStockXAlmacenProducto?.ubicacion : ubicacion}
                            type="text"
                            placeholder="Ubicacion"
                            {...register("ubicacion")}
                            onChange={(e) => setUbicacion(e.target.value)}
                          />
                          <label className="form__label">Ubicacion</label>
                          {errors.stock?.type === "required" && (
                            <p>Campo requerido</p>
                          )}
                        </InputText>
                      </article>


                    </ContainerStock>)
                  }


              </section>
              

              <Btn1
                icono={<v.iconoguardar />}
                titulo="Guardar"
                bgcolor="#F9D70B"
              />
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
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);

  .sub-contenedor {
    position: relative;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 13px 36px;
    z-index: 100;
    height: calc(100vh - 40px);
    overflow-y: auto;
    border-radius: 8px;

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h1 {
        font-size: 30px;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .formulario {
      display: grid;
      grid-template-columns: 1fr;
      gap: 15px;
      @media ${Device.tablet} {
        grid-template-columns: repeat(2, 1fr);
      }
      .seccion1,
      .seccion2 {
        gap: 20px;
        display: flex;
        flex-direction: column;
      }
      .contentPadregenerar {
        position: relative;
      }
    }
  }
`;
const ContainerStock = styled.div`
  border: 1px solid rgba(240, 104, 46, 0.9);
  display: flex;
  border-radius: 15px;
  padding: 12px;
  flex-direction: column;
  background-color: rgba(240, 127, 46, 0.05);
`;
const ContainerBtngenerar = styled.div`
  position: absolute;
  right: 0;
  top: 10%;
`;
const ContainerMensajeStock = styled.div`
  text-align: center;
  color: #f9184c;
  background-color: rgba(249, 24, 61, 0.2);
  border-radius: 10px;
  padding: 5px;
  margin: 10px;
  font-weight: 600;
`;