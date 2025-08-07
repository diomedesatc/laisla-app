import { SkewLoader } from "react-spinners"
import styled from "styled-components"
export function SpinnerSecundario(){
    return(
        <Container>
            <SkewLoader size={35} color="#648DB3" />
        </Container>
    )
}

const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 100vh;
    
`