import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Grid } from  'react-loader-spinner';




function TelaLogin2() {


    const navigate = useNavigate();

    return (
        <>
            <Container>
            <Grid color="#00BFFF" height={50} width={80} />            
            <h1>TELA LOGIN-2</h1>
            <h1>TrackIt</h1>
            <button onClick={() => alert("botão apertado")}>Entrar</button>
            <p onClick={() => navigate("/cadastro2")}>Não tem uma conta? Cadastre-se</p>
            </Container>
        </>
    )
}

export default TelaLogin2;

const Container = styled.div`
button {
    font-size: 16px;
    color: #FFFFFF;
    width: 84px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-left: 19px;
    background-color: var(--cor-botao-footer);
}

`