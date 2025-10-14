import styled from "styled-components";
import {Btn1, Device, InputText2, LottieAnimation, useCartVentasStore, useDetalleVentaStore, useEmpresaStore, useVentasStore, } from "../../../index"
import { useQuery } from "@tanstack/react-query";
import {blur_in} from "../../../styles/keyframes";
import { RiDeleteBin2Line } from "react-icons/ri";
import {FormatearNumeroDinero} from "../../../utils/Conversiones"
import animacionVacia from "../../../assets/animacionVacia.json";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";



export function AreadetalleventaPos() {
    const{items, addcantidaditem, restarcantidaditem, removeItem , updateCantidadItem} = useCartVentasStore();
    const{dataEmpresa} = useEmpresaStore();
    const [editIndex, setEditIndex] = useState(null);
    const [newCantidad, setNewCantidad] = useState(1);
    const handleEditClick = (index, cantidad) =>{
        setEditIndex(index);
        setNewCantidad(cantidad);
    }
    const handleInputChange = (e) => {
        const value = Math.max(1, parseFloat(e.target.value));
        setNewCantidad(value);
    }

    const handleInputBlur = (item) => {
        updateCantidadItem(item, newCantidad);
        setEditIndex(null);
    }

    const handleKeyDown = (e, item) => {
        if(e.key === "Enter"){
            handleInputBlur(item)
        }
    }



    return (

        <AreaDetalleventa className={items.length > 0 ? "" : "animacion"}>
        {
            items.length > 0 ? (                
            items.map((item, index) =>{
                return(
                <Itemventa key={index}>
                <article className="contentdescripcion">
                    <span className="descripcion">{item._descripcion}</span>
                    <span className="importe"><strong> Precio unit.:</strong> {FormatearNumeroDinero(item._precio_venta, dataEmpresa?.currency, dataEmpresa?.iso)}</span>
                </article>
                <article className="contentbtn">
                    <Btn1 bgcolor="#0aca21" color="#fff" funcion={()=>addcantidaditem(item)} icono={<Icon icon="material-symbols:expand-circle-up-outline"  />} width="35px" height="35px">

                    </Btn1>
                    {
                        editIndex === index?(
                            <InputText2>
                                <input 
                                type="number" 
                                value={newCantidad} 
                                onChange={handleInputChange} 
                                onBlur={() => handleInputBlur(item)}  
                                onKeyDown={(e) => handleKeyDown(e,item)} 
                                className="form__field" 
                                min="1"/>
                            </InputText2>
                        ) : (
                            <>
                            <span className="cantidad">{item._cantidad}</span>
                            <Icon icon="mdi:pencil" className="edit-icon" onClick={()=>handleEditClick(index,item._cantidad)} />
                            </>
                        )

                    }
                    
                    <Btn1 funcion={()=>restarcantidaditem(item)} icono={<Icon icon="material-symbols:expand-circle-down-outline-rounded"  />} width="35px" height="35px">
                        
                    </Btn1>
                </article>
                <article className="contentTotaldetalleventa">
                    <span className="cantidad">
                         <strong>{FormatearNumeroDinero(item._total, dataEmpresa?.currency, dataEmpresa?.iso)} </strong>
                    </span>                    
                    <span className="delete" onClick={ () => removeItem(item)}>
                        <RiDeleteBin2Line />
                    </span>
                </article>
            </Itemventa>

                )
            })
            ):(<LottieAnimation animacion={animacionVacia} ancho={200} alto={200}/>)
        }
            
        </AreaDetalleventa>
    )
};



const AreaDetalleventa = styled.section`
  display: flex;
  width: 100%;
  margin-top: 10px;
  flex-direction: column;
  gap: 10px;
 
  &.animacion {
    height: 100%;
    justify-content: center;
  }
`;
const Itemventa = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px dashed ${({ theme }) => theme.color2};
  animation: ${blur_in} 0.2s linear both;
  flex-direction: column;
  gap: 10px;
  .contentdescripcion {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    .descripcion {
      font-weight: 700;
      font-size: 20px;
    }
    .importe {
      font-size: 15px;
    }
  }
  .contentbtn {
    display: flex;
    width: 100%;
    height: 100%;
    gap: 10px;
    align-items: center;
    justify-content: center;
    .cantidad {
      font-size: 1.8rem;
      font-weight: 700;
    }
    .edit-icon {
      cursor: pointer;
      font-size: 18px;
    }
  }
  .contentTotaldetalleventa {
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: end;
    margin-bottom: 10px;
    width: 100%;
    .delete {
      cursor: pointer;
      width: 20px;
      align-self: flex-end;
    }
  }
  @media ${Device.tablet} {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    .contentdescripcion {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
      .descripcion {
        font-weight: 700;
        font-size: 20px;
      }
      .importe {
        font-size: 15px;
      }
    }
    .contentbtn {
      display: flex;
      width: 100%;
      height: 100%;
      gap: 10px;
      align-items: center;
      justify-content: center;
      .cantidad {
        font-size: 1.8rem;
        font-weight: 700;
      }
      .edit-icon {
        cursor: pointer;
        font-size: 18px;
      }
    }
    .contentTotaldetalleventa {
      display: flex;
      flex-direction: column;
      justify-content: end;
      text-align: end;
      margin-bottom: 10px;
      width: 100%;
      .delete {
        cursor: pointer;
        width: 20px;
        align-self: flex-end;
      }
    }
  }
`;

