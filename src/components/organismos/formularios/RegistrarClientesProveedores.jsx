import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import {
  InputText,
  Btn1,
  useCategoriasStores,
  Icono,
  ConvertirCapitalize,
  useClientesStore,
} from "../../../index";
import { useForm } from "react-hook-form";
import { CirclePicker } from "react-color";
import { useEmpresaStore } from "../../../store/EmpresaStore";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import {ValidarRut, ValidarEmail} from '../../../utils/validaciones/Validaciones';
import Swal from "sweetalert2";

export function RegistrarClientesProveedores({
  onClose,
  dataSelect,
  accion,
}) {
  const { insertarClienteOProveedor, eliminarClienteOProveedor, editarClienteOProveedor } = useClientesStore();
  const { dataEmpresa } = useEmpresaStore();
  const [currentColor, setColor] = useState("#F44336");
  const [file, setFile] = useState([]);
  const ref = useRef(null);
  const [fileurl, setFileurl] = useState();
  const location = useLocation();
  const { tipo } = useClientesStore();
  const [errorRut, setErrorRut] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { isPending, mutate: doInsertar } = useMutation({
    mutationFn: insertar,
    mutationKey: "insertar",
    onError: (err) => console.log("El error", err.message),
    onSuccess: () => cerrarFormulario(),
    
  });
  const handlesub = (data) => {
    doInsertar(data);
  };
  const cerrarFormulario = () => {
    Swal.fire({
      title: "Ingreso correcto!",
      icon: "success",
      text: "Cliente ingresado correctamente."
    })
    onClose();
  };

  const handleOnChange = (e) =>{
    let value = e.target.value;
    if(ValidarRut(value) == false){
      setErrorRut('Rut Invalido.');
    }else{
      setErrorRut('');
    }

  }
  async function insertar(data) {
    if (accion === "Editar") {
      const p = {
        // You need to populate this object for editing
        // Example: _id: dataSelect.id, _nombre: data.nombre, etc.
        _id: dataSelect.id, // Assuming dataSelect has an id
        _nombres: ConvertirCapitalize(data.nombre),
        _id_empresa: dataEmpresa?.id,
        _direccion: data.direccion,
        _telefono: data.telefono,
        _email: data.email,
        _identificador_nacional: data.identificador_nacional,
        _identificador_fiscal: data.identificador_fiscal,
        _tipo: tipo // Ensure 'tipo' is correctly passed for editing as well if needed
      };
      await editarClienteOProveedor(p);
    } else {

      const p = {
        _nombres: ConvertirCapitalize(data.nombre),
        _id_empresa: dataEmpresa?.id,
        _direccion: data.direccion,
        _telefono: data.telefono,
        _email: data.email,
        _identificador_nacional: data.identificador_nacional,
        _identificador_fiscal: data.identificador_fiscal,
        _tipo: tipo

      };
      if(ValidarRut(data.identificador_nacional) === false){
        Swal.fire({
          title: "Oops...",
          icon: "warning",
          text: "Has ingresado un rut que no es valido, intentalo de nuevo!"
        })
        return;
      }
      await insertarClienteOProveedor(p);
    }
  }
  useEffect(() => {
    if (accion === "Editar" && dataSelect) {
      // If you need to set form values for editing, do it here
      // For example:
      // setValue("nombre", dataSelect.nombre);
      // setValue("direccion", dataSelect.direccion);
      // ... and so on for other fields
    }
  }, [accion, dataSelect]); // Add dataSelect and accion as dependencies
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
                  ? "Editar"
                  : "Registrar nuevo."}
              </h1>
            </section>

            <section>
              <span onClick={onClose}>x</span>
            </section>
          </div>
          <FormularioContainer onSubmit={handleSubmit(handlesub)}> {/* Use the new styled component */}
            <div className="form-content"> {/* Wrap form fields in a scrollable div */}
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect?.nombre} 
                    type="text"
                    placeholder="Nombre"
                    {...register("nombre", {
                      required: true,
                    })}
                  />
                  <label className="form__label">Nombre</label>
                  {errors.nombre?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect?.direccion}
                    type="text"
                    placeholder="Direccion"
                    {...register("direccion", {
                      required: false,
                    })}
                  />
                  <label className="form__label">Direccion</label>
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect?.telefono}
                    type="text"
                    placeholder="Telefono"
                    {...register("telefono", {
                      required: false,
                    })}
                  />
                  <label className="form__label">Telefono</label>
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect?.email}
                    type="text"
                    placeholder="Email"
                    {...register("email", {
                      required: false,
                    })}
                  />
                  <label className="form__label">Email</label>
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect?.identificador_nacional}
                    type="text"
                    placeholder="Identificacion"
                    {...register("identificador_nacional", {
                      required: false,
                    })}
                    onChange={handleOnChange}
                  />
                  <label className="form__label">Identificacion</label>
                </InputText>
                {errorRut && <p style={{ color: 'red' }}>{errorRut}</p>}
              </article>
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect?.identificador_fiscal}
                    type="text"
                    placeholder="Identificacion"
                    {...register("identificador_fiscal", {
                      required: false,
                    })}
                  />
                  <label className="form__label">Identificacion Fiscal</label>
                </InputText>
              </article>
              {/* Add other form fields here */}
            </div>
            <Btn1
              icono={<v.iconoguardar />}
              titulo="Guardar"
              bgcolor="#F9D70B"
            />
          </FormularioContainer>
        </div>
      )}
    </Container>
  );
}
// --- Styled Components ---

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
    width: 500px;
    max-width: 85%;
    height: calc(100vh - 60px); // This maintains the overall modal height
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;

    display: flex; /* Make sub-contenedor a flex container */
    flex-direction: column; /* Stack children vertically */
    overflow: hidden; /* Hide any potential overflow from its children */

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      flex-shrink: 0; /* Prevent header from shrinking */

      h1 {
        font-size: 20px;
        font-weight: 500;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
`;

const FormularioContainer = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Allow the form to take up remaining space */
  overflow: hidden; /* Hide overflow within the form itself */

  .form-content {
    flex-grow: 1; /* Allow this content area to grow */
    overflow-y: auto; /* Enable vertical scrolling */
    padding-right: 15px; /* Add some padding to avoid scrollbar overlapping content */
    margin-right: -15px; /* Compensate for the padding-right */
    display: flex;
    flex-direction: column;
    gap: 20px; /* Maintains gap between articles */

    /* Style for scrollbar (optional, for aesthetics) */
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.scrollthumb};
      border-radius: 4px;
    }
    &::-webkit-scrollbar-track {
      background-color: ${({ theme }) => theme.scrolltrack};
    }
  }

  //{Btn1} { /* Target the Btn1 directly inside FormularioContainer */
    //margin-top: 20px; /* Add some space above the button */
    //flex-shrink: 0; /* Prevent the button from shrinking */
  //}
`;

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