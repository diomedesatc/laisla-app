import styled from "styled-components";
import {v} from "../../styles/variables"
import { Btn1, Buscador, Title,  } from "../../index";
import { useState } from "react";
import { Toaster } from "sonner";
import { BuscadorList } from "../ui/list/BuscadorList";

export function CrudTemplate({FormularioRegistro,
  title,
  Tabla,
  data,
  setBuscador,
  tipoBuscador,
  dataBuscadorList,
  selectBuscadorList,
  setBuscadorList,}){
    const [openRegistro, setOpenRegistro] = useState(false)
    const[action, setAction] = useState("");
    const[dataSelect, setDataSelect] = useState([]);
    function nuevoRegistro(){
        setOpenRegistro(!openRegistro);
        setAction("Nuevo");
        setDataSelect([]);
    }
    return(
        <Container>
      <Toaster position="top-right" />
      {openRegistro && FormularioRegistro && (
        <FormularioRegistro
          onClose={() => setOpenRegistro(!openRegistro)}
          dataSelect={dataSelect}
          accion={action}
        />
      )}
      <section className="area1">
        <Title>{title} </Title>
        <Btn1
          funcion={nuevoRegistro}
          bgcolor={v.colorPrincipal}
          titulo="nuevo"
          icono={<v.iconoagregar />}
        />
      </section>
      <section className="area2">
        {tipoBuscador === "list" ? (
          <BuscadorList
            data={dataBuscadorList}
            onSelect={selectBuscadorList}
            setBuscador={setBuscadorList}
          />
        ) : (
          <Buscador setBuscador={setBuscador} />
        )}
      </section>

      <section className="main">
        {Tabla && (
          <Tabla
            setdataSelect={setDataSelect}
            setAccion={setAction}
            SetopenRegistro={setOpenRegistro}
            data={data}
          />
        )}
      </section>
    </Container>
    )
}

const Container = styled.div`
height: calc(100vh - 30px);
padding: 15px;
display: grid;
grid-template: 
"area1" 60px
"area2" 60px
"main" auto;

.area1{
    grid-area: area1;
    //background-color: rgba(212, 243, 98, 0.596);
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 15px;

}
.area2{
    grid-area: area2;
    //background-color: rgba(247, 207, 216, 0.808);
    display: flex;
    justify-content: end;
    align-content: center;

}
.main{
    grid-area: main;
    //background-color: rgba(166, 214, 214,0.8)
    
}
    
`