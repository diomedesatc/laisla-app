import styled from "styled-components";
import { Device} from "../../index";
import { useEffect, useRef, useState } from "react";
export function ListaDesplegable({ data, setState, funcion, scroll,top,state, refetch, funcioncrud }) {
  if(!state) return;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dropdownRef = useRef(null);

  function seleccionar(p) {
    
    funcion(p);
    
    if(funcioncrud){
      funcioncrud();
    }
    
    if(refetch){
      refetch();
    }
    setState();
  }
  const handleKeyDown = (e) =>{
    if(e.key === 'Enter'){
      seleccionar(data[selectedIndex])
    }else if(e.key === 'ArrowUp'){
      setSelectedIndex((previewindex)=>previewindex === 0 ? data.length - 1 : previewindex - 1);
    }else if(e.key === 'ArrowDown'){
      setSelectedIndex((previewindex)=> previewindex === 0 ? data.length - 1 : previewindex + 1);
    }


  };

  return (
    <Container scroll={scroll} $top={top} ref={dropdownRef} tabIndex={0} onKeyDown={handleKeyDown}>
      <section className="contentClose" onClick={setState}>
       x
      </section>
      <section className="contentItems">
        {data?.map((item, index) => {
          return (
            <ItemContainer style={{background: index === selectedIndex? "rgba(47,48,52,0.3)" : ""}} key={index} onClick={() => seleccionar(item)}>
              <span>🌫️</span>
              <span>{item?.nombre}</span>
            </ItemContainer>
          );
        })}
      </section>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  position: absolute;
  margin-bottom: 15px;
  top: ${(props)=>props.$top};
  width: 90%;
  padding: 10px;
  border-radius: 10px;
  gap: 10px;
  z-index: 3;
  @media ${() => Device.tablet} {

  }
  .contentClose{
    font-weight:700;
    cursor: pointer;
    font-size:20px;
  }
  .contentItems {
    overflow-y: ${(props) => props.scroll};
  }
`;
const ItemContainer = styled.div`
  gap: 10px;
  display: flex;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.bgtotal};
  }
`;