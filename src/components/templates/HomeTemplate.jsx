import styled from  "styled-components";
import { useAuthStore } from "../../store/AuthStore";
import { UserAuth } from "../../context/AuthContent";
import {Btn1, Welcome} from "../../index";
import ticket from "../../reports/TicketVenta"
import { useState } from "react";
import {useCartVentasStore} from '../../store/CartVentasStore';


export function HomeTemplate(){
    

    return (
        <Container>
            <Welcome />
        </Container>
    )
}

const Container = styled.div`
height: 100vh;
    
`