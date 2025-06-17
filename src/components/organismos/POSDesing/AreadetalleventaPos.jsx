import styled from "styled-components";


export function AreadetalleventaPos() {
    return (

        <Areadetalleventa>
            <Itemventa>
                <article className="contentdescription">
                    <span className="descripcion">Mona china - $ 9.99 </span>
                    <span>Stock: 34 UND</span>

                </article>
                <article>
                    <span className="detalle">
                        <strong>Cant:</strong> 1 UND <strong> Importe:</strong> $9.99
                    </span>
                </article>


            </Itemventa>
        </Areadetalleventa>
    )
};



const Areadetalleventa = styled.section`
    display: flex;
    width: 100%;
    margin-top: 10px;


`;


const Itemventa = styled.section`
    display: flex;
    justify-content: space-between;
    width: 100%;
    .contentdescription{
        display: flex;
        flex-direction: column;
        .descripcion{
            font-weight: 700;
            font-size: 20px;
        }
    }
    
`;


