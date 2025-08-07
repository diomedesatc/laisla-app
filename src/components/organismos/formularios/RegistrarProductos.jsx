import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import {
  InputText,
  Btn1,  
  Icono,
  ConvertirCapitalize,
  useProductosStores,
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

export function RegistrarProductos({
  onClose,
  dataSelect,
  accion,
}) {
  const [isChecked1, setIsChecked1] = useState(true);
  const [isChecked2, setIsChecked2] = useState(false);
  const [sevendepor, setsevendepor] = useState("Unidad");
  const [stateEnabledStock, setStateEnabledStock] = useState(false);

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
  const { insertarProductos, editarProductos} = useProductosStores();
  const { dataEmpresa } = useEmpresaStore();
  const [stateInventarios, setStateInventarios] = useState(true);
  const {sucursalesItemSelect, dataSucursales, selectSucursal} = useSucursalesStore();
  const [stateSucursalesLista, setStateSucursalesLista] = useState(false);
  const {dataCategorias, selectCategoria, categoriaItemSelect} = useCategoriasStores();
  const [stateCategoriasLista, setStateCategoriasLista] = useState(false);
  const {insertarStockAlmacenes, mostrarAlmacen, dataalmacen, eliminarAlmacen} = useAlmacenesStore();


  const [currentColor, setColor] = useState("#F44336");
  const [file, setFile] = useState([]);
  const ref = useRef(null);
  const [fileurl, setFileurl] = useState();
  const[idEmpresa, setIdempresa] = useState(dataSelect?.id_empresa || '' );

  const {data, error, isLoading, refetch} = useQuery({
    queryKey: ["Mostrar stock almacen por sucursal", {id_producto: dataSelect.id, id_sucursal: sucursalesItemSelect.id}],
    queryFn: ()=> mostrarAlmacen({id_sucursal: sucursalesItemSelect.id, id_producto: dataSelect.id}),
    enabled: stateInventarios,
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
    onError: (err) => console.log("El error", err.message),
    onSuccess: () => cerrarFormulario(),
  });
  const handlesub = (data) => {
    doInsertar(data);
  };
  const cerrarFormulario = () => {
    onClose();
  };


  async function insertar(data) {

    if(stateInventarios){
      if(!dataalmacen){
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
      const p = {
        _id: dataSelect.id,
        _nombre: ConvertirCapitalize(data.nombre),
        _precio_venta: parseFloat(data.precio_compra),
        _precio_compra: parseFloat(data.precio_venta),
        _id_categoria: categoriaItemSelect.id,
        _codigo_barra: "-",
        _codigo_interno: "-",        
        _id_empresa: dataEmpresa.id,
        _sevende_por: sevendepor,
        _maneja_inventario: stateInventarios,
        _maneja_multiprecios: false,
      };
      await editarProductos(p, dataSelect.icono, file);
      if(stateInventarios){
        if(dataalmacen == null){
          const m = {
            id_producto: dataSelect.id,
            stock: parseFloat(data.stock),
            stock_minimo:parseFloat(data.stock_minimo),
            id_sucursal: dataSucursales[0].id,
          }          
          await insertarStockAlmacenes(m);
        }
      }
    } else {
      const p = {
        _nombre: ConvertirMinisculas(data.nombre),
        _precio_venta: parseFloat(data.precio_venta),
        _precio_compra: parseFloat(data.precio_compra),
        _id_categoria: categoriaItemSelect.id,
        _codigo_barra: "-",
        _codigo_interno: "-",        
        _id_empresa: dataEmpresa.id,
        _sevende_por: sevendepor,
        _maneja_inventario: stateInventarios,
        _maneja_multiprecios: false,
      };

      const id_nuevoProducto = await insertarProductos(p);

      if(stateInventarios){
        const m = {
          id_producto: id_nuevoProducto,
          stock: parseFloat(data.stock),
          stock_minimo:parseFloat(data.stock_minimo),
          id_sucursal: dataSucursales[0].id,
        }

        
        await insertarStockAlmacenes(m);
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
      dataSelect.maneja_inventario?setStateEnabledStock(true):setStateEnabledStock(false);
      dataSelect.sevende_por === "Unidad" ? handleCheckboxChange(1) : handleCheckboxChange(0);
      dataSelect.maneja_inventario === true ? setStateInventarios(true) : setStateInventarios(false); 
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
              <span onClick={onClose}>x</span>
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
                        <Selector texto1='🏢' texto2={categoriaItemSelect?.nombre} funcion={()=> setStateCategoriasLista(!stateCategoriasLista)}
                        state={stateCategoriasLista}/>                        
                        <ListaDesplegable data={dataCategorias}  top='4rem' state={stateCategoriasLista} setState={()=> setStateCategoriasLista(!stateCategoriasLista)} 
                        funcion={selectCategoria} />
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
                        <Selector texto1='🏢' texto2={sucursalesItemSelect?.nombre} funcion={()=> setStateSucursalesLista(!stateSucursalesLista)}
                        state={stateSucursalesLista}/>                        
                        <ListaDesplegable refetch={refetch} data={dataSucursales}  top='4rem' state={stateSucursalesLista} setState={()=> setStateSucursalesLista(!stateSucursalesLista)} 
                        funcion={selectSucursal} />
                      </ContainerSelector>
                      {
                        stateEnabledStock && (                          
                        <ContainerMensajeStock>
                          <span>Para editar el stock vaya a la configuracion de kardex.</span>
                        </ContainerMensajeStock>
                        )
                      }
                      <article>
                        <InputText icono={<v.iconoflechaderecha />}>
                          <input
                            disabled={stateEnabledStock}
                            className="form__field"
                            defaultValue={dataalmacen?.stock}
                            step='1'
                            type="number"
                            placeholder="Stock"
                            {...register("stock")}
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
                            disabled={stateEnabledStock}
                            className="form__field"
                            defaultValue={dataalmacen?.stock_minimo}
                            step='1'
                            type="number"
                            placeholder="Stock minimo"
                            {...register("stock_minimo")}
                          />
                          <label className="form__label">Stock minimo</label>
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

  .sub-contenedor {
    position: relative;
    width: 80%;    
    height: calc(100vh - 60px);
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;
    overflow-y: auto;

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h1 {
        font-size: 20px;
        font-weight: 500;
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
        grid-template-columns: repeat(2,1fr);
        
      }

      .seccion1,
      .seccion2{
        gap: 10px;
        display: flex;
        flex-direction: column;
        width: 70%;
        height: 30%;
      }


    }
  }
`;

const ContainerStock = styled.div`
  border: 1px solid rgba(240,104,46,0.9);
  display: flex;
  border-radius: 15px;
  padding: 12px;
  flex-direction: column;
  background-color: rgba(240,127,46,0.05);
  width: 90%;
  
`

const ContentTitle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;

  svg {
    font-size: 25px;
  }
  input {
    border: none;
    outline: none;
    background: transparent;
    padding: 2px;
    width: 40px;
    font-size: 28px;
  }
`;

const ContainerMensajeStock = styled.div`
  text-align: center;
  color: #f9184c;
  background-color: rgba(249, 24, 35, 0.2);
  border-radius: 10px;
  padding: 5px;
  margin: 10px;
`
const PictureContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  border: 2px dashed #f9d70b;
  border-radius: 5px;
  background-color: rgba(249, 215, 11, 0.1);
  padding: 8px;
  position: relative;
  gap: 3px;
  margin-bottom: 8px;

  .ContentImage {
    overflow: hidden;
    img {
      width: 100%;
      object-fit: contain;
    }
  }
  input {
    display: none;
  }
`;