import styled from  "styled-components";
import { useAuthStore } from "../../store/AuthStore";
import { UserAuth } from "../../context/AuthContent";
import {Welcome} from "../../index";


export function HomeTemplate(){
    const {cerrarSesion} = useAuthStore();
    const{user}= UserAuth();

    return (
        <Container>
<<<<<<< HEAD
            <Welcome />        
=======
            <Welcome />
           
>>>>>>> 35546d99a8f18c2f9f187aeddfaaf697741d7796

        </Container>
    )
}

const Container = styled.div`
height: 100vh;
    
`