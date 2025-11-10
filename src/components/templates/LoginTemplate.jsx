import styled from "styled-components";
import { Btn1, Footer, InputText2, Linea, Spinner1, SpinnerSecundario, Title, useAuthStore, useEmpresaStore } from "../../index";
import {v} from '../../styles/variables';
import {Device} from "../../styles/breakpoints";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast, Toaster } from "sonner";

export function LoginTemplate(){
    const {loginGoogle, loginEmail}= useAuthStore();
    const {register, handleSubmit} = useForm();
    const {mutate, isPending} = useMutation({
        mutationKey: ["iniciar con email"],
        mutationFn:loginEmail,
        onError: (error) => {
        toast.error(`Error: ${error.message}`)

        }
    })
    const manejadorEmail = (data) =>{
        mutate({
            email: data.email,
            password: data.pass
        })

    }
    if(isPending){
        return <Spinner1 />
    }
    return(
        <Container>
            <Toaster />
                <div className="card">
                    <ContentLogo>
                        <img src={v.logo} />
                    </ContentLogo>
                    <Title $paddingbottom="20px">Ingresar</Title>
                    <form onSubmit={handleSubmit(manejadorEmail)}>
                        <InputText2>
                        <input className="form__field" placeholder="email" type="text" {
                            ...register("email", {required: true})
                        }/>                        
                        </InputText2>
                        <InputText2>
                        <input className="form__field" placeholder="contraseña" type="password"{
                            ...register("pass", {required: true})
                        }/>                                             
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