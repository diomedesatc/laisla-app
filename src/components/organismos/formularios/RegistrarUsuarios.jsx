import styled from "styled-components";
import { v } from "../../../styles/variables";
import { useForm } from "react-hook-form";
import { BtnClose } from "../../ui/buttons/BtnClose";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCajaStore } from "../../../store/CajaStore";
import { SelectList } from "../../ui/list/SelectList";
import { BarLoader } from "react-spinners";
import { PermisosUser } from "../UsuariosDesing/PermisosUser";
import { useRolesStore } from "../../../store/RolesStore";
import { InputText } from "./InputText";
import { Btn1 } from "../../moleculas/Btn1";
import { useSucursalesStore } from "../../../store/SucursalesStore";
import { useEmpresaStore } from "../../../store/EmpresaStore";
import { useUsuarioStore } from "../../../store/UsuarioStore";
export function RegistrarUsuarios({accion, dataSelect, onClose }) {
  const queryClient = useQueryClient();
  
  const { dataEmpresa } = useEmpresaStore();
  const {
    cajaSelectItem,
    setStateCaja,
    insertarCaja,
    editarCaja,
    mostrarCajaxSucursal,
    setCajaSelectItem
  } = useCajaStore();
  const {mostrarSucursales, sucursalesItemSelect, selectSucursal} = useSucursalesStore();
  const{insertarUsuario} = useUsuarioStore();
  const {selectRolesItem} = useRolesStore();
  
  const {data: dataSucursales, isLoading: isLoadingSucursales} = useQuery({
    queryKey: ["mostrar sucursales", {id_empresa: dataEmpresa?.id}],
    queryFn: () => mostrarSucursales({id_empresa: dataEmpresa?.id}),
    enabled: !!dataEmpresa

  });

  const {data: dataCaja , isLoading: isLoadingCajas} = useQuery({
    queryKey: ["mostrar caja por sucursal",{id_sucursal: sucursalesItemSelect?.id} ],
    queryFn: () => mostrarCajaxSucursal({id_sucursal: sucursalesItemSelect?.id}),
    enabled: !!sucursalesItemSelect

  })
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const insertar = async(data) =>{
    const p = {
      id: accion === "Editar" ? dataSelect.id : null,
      nombres: data.nombres,
      nro_doc: data.nro_doc,
      telefono: data.telefono,
      id_rol: selectRolesItem?.id,
      email: data.email,
      id_sucursal: sucursalesItemSelect?.id,
      id_caja: cajaSelectItem?.id,
      pass: data.pass,
      correo: data.email
    };
    console.log(p);
    if(accion === "Editar"){

    }else{
      await insertarUsuario(p);
    }


  }
  const { isPending, mutate: doInsertar } = useMutation({
    mutationKey: ["insertar usuario"],
    mutationFn: insertar,
    onError: (error) => {
      console.log(error.message)
      toast.error(`Error: ${error.message}`);
    },
    onSuccess: () => {
      toast.success("Usuario registrado correctamente");
      queryClient.invalidateQueries(["mostrar Cajas XSucursal"]);
      onClose();
    },
  });

  const manejadorInsertar = (data) => {
    doInsertar(data);
  };

  const isLoading = isLoadingSucursales || isLoadingCajas;
  if(isLoading) return <BarLoader color = "#6d6d6d" />

  return (
    <Container>
      {isPending ? (
        <span>Guardando...🔼</span>
      ) : (
        <Form onSubmit={handleSubmit(manejadorInsertar)}>
            <Header>
                <Title>{accion === "Editar" ? "Editar usuario" : "Registrar usuario"}</Title>
                <BtnClose funcion={onClose}/>    
            </Header>
            <section className="main">
                <section className="area1">
                    <article>
                        <InputText icono={<v.iconoflechaderecha />}>
                            <input
                                        className="form__field"
                                        defaultValue= {accion ==="Editar"?  dataSelect?.descripcion:""}
                                        type="text"
                                        {...register("email", {
                                          required: true,
                                        })}
                                      />
                                      <label className="form__label">Correo</label>
                                      {errors.email?.type === "required" && <p>Campo requerido</p>}
                        </InputText>
                    </article>
                    <article>
                                    <InputText icono={<v.iconoflechaderecha />}>
                                      <input
                                        className="form__field"
                                        defaultValue= {accion ==="Editar"?  dataSelect?.descripcion:""}
                                        type="password"
                                        {...register("pass", {
                                          required: true,
                                        })}
                                      />
                                      <label className="form__label">Contraseña</label>
                                      {errors.pass?.type === "required" && <p>Campo requerido</p>}
                                    </InputText>
                    </article>
                    <article>
                                    <InputText icono={<v.iconoflechaderecha />}>
                                      <input
                                        className="form__field"
                                        defaultValue= {accion ==="Editar"?  dataSelect?.nombres:""}
                                        type="text"
                                        {...register("nombres", {
                                          required: true,
                                        })}
                                      />
                                      <label className="form__label">Nombres</label>
                                      {errors.nombres?.type === "required" && <p>Campo requerido</p>}
                                    </InputText>
                    </article>
                    
                    <article>
                                    <InputText icono={<v.iconoflechaderecha />}>
                                      <input
                                        className="form__field"
                                        defaultValue= {dataSelect?.nro_doc}
                                        type="number"
                                        {...register("nro_doc", {
                                          required: true,
                                        })}
                                      />
                                      <label className="form__label">Numero doc</label>
                                      {errors.nro_doc?.type === "required" && <p>Campo requerido</p>}
                                    </InputText>
                    </article>
                    <article>
                                    <InputText icono={<v.iconoflechaderecha />}>
                                      <input
                                        className="form__field"
                                        defaultValue= {dataSelect?.telefono}
                                        type="number"
                                        {...register("telefono", {
                                          required: true,
                                        })}
                                      />
                                      <label className="form__label">Telefono</label>
                                      {errors.telefono?.type === "required" && <p>Campo requerido</p>}
                                    </InputText>
                    </article>
                     <span>Asignación de caja</span>
              <article className="contentasignacion">
                <span>Sucursal:</span>
                <SelectList
                  onSelect={selectSucursal}
                  itemSelect={sucursalesItemSelect}
                  displayField="nombre"
                  data={dataSucursales}
                />
              </article>
              <article className="contentasignacion">
                <span>Caja:</span>
                <SelectList
                  onSelect={setCajaSelectItem}
                  itemSelect={cajaSelectItem}
                  displayField="descripcion"
                  data={dataCaja}
                />
              </article>
                    <Btn1 titulo="Guardar" bgcolor="#2c2ca8" color="#fff"/>
                    

                </section>
                <section className="area2">
                  <PermisosUser />                                

                </section>

            </section>

        </Form>

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

`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    background-color: ${({theme}) => theme.body};
    padding: 20px;
    border-radius: 8px;
    position: relative;
    overflow-y: auto;
    max-height: 90vh;
    width: 100%;
    margin: 10px;
    border: 1px solid ${({theme}) => theme.bg};
    .main{
        display: flex;
        flex-direction: column;
        gap: 15px;
        overflow-y: auto;
        .area1{
            display: flex;
            flex-direction: column;
            height: 100%;
            align-items: center;
        }
    }    
`

const Header = styled.div`
    width: 100%;
    display: flex;
`

const Title = styled.span`
    font-size: 30px;
    font-weight: bold;
`