import styled from "styled-components";
import { Btn1, Footer, InputText2, Linea, Title, useAuthStore, useEmpresaStore } from "../../index";
import {v} from '../../styles/variables';
import {Device} from "../../styles/breakpoints";

export function LoginTemplate(){
    const {loginGoogle}= useAuthStore();
    return(
        <Container>
                <div className="card">
                    <ContentLogo>
                        <img src={v.logo} />
                    </ContentLogo>
                    <Title $paddingbottom="20px">Ingresar</Title>
                    <form>
                        <InputText2>
                        <input className="form__field" placeholder="email" type="text"/>                        
                        </InputText2>
                        <InputText2>
                        <input className="form__field" placeholder="contraseña" type="password"/>                                             
                        </InputText2>
                        <Btn1 titulo="INGRESAR" bgcolor="#1CB0F6" color="255,255,255" width="100%"/>
                    </form>
                    <Linea>
                        <span>O</span>
                    </Linea >
                    <Btn1 funcion={loginGoogle}titulo="Google" bgcolor="#fff" icono={<v.iconogoogle/>}></Btn1>
                </div>
                <Footer />
        </Container>
    )

}

const Container = styled.div`
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
text-align: center;
flex-direction: column;
padding: 10px 0;
color: ${(props) => props.theme.text};

    .card{
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        width: 100%;
        margin: 20px;
        @media ${Device.tablet} {
            width: 400px;
            
        }
        form{
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

    }
    
`

const ContentLogo = styled.section`
    display:flex;
    align-items: center;
    justify-content: center;
    margin: 20px;
    img{
        width: 45%;
    }

    
`