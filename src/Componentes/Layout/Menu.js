import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Menu() {

    const navigate = useNavigate();

    return (
        <Container>
            <Habitos onClick={() => navigate("/habitos")}>
            Hábitos </Habitos>
            <Historico onClick={() => navigate("/historico")}>
            Histórico </Historico>
        </Container>
    )
}

const Container = styled.div`
    font-family: 'Lexend Deca', sans-serif;
    font-size: 14px;
    color: var(--cor-azul-claro);
    width: 375px;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    border: 1px solid var(--cor-cinza-borda);
    background-color: #FFFFFF;
`
const Habitos = styled.p`
    margin-left: 36px;
`
const Historico = styled.p`
    margin-right: 36px;
`

export default Menu;