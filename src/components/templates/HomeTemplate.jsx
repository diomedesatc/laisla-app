import styled from  "styled-components";
import { useAuthStore } from "../../store/AuthStore";
import { UserAuth } from "../../context/AuthContent";
import {Welcome} from "../../index";


export function HomeTemplate(){
    const {cerrarSesion} = useAuthStore();
    const{user}= UserAuth();

    return (
        <Container>
            <Welcome />
           

        </Container>
    )
}

const Container = styled.div`
height: 100vh;
    
`