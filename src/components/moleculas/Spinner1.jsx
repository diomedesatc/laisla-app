import { ClimbingBoxLoader } from "react-spinners"
import styled from "styled-components"
export function Spinner1(){
    return(
        <Container>
            <ClimbingBoxLoader size={35} color="#648DB3" />
        </Container>
    )
}

const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 100vh;
    
`