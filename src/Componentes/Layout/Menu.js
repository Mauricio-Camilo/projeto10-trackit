import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

function Menu() {

    const { porcentagem } = useContext(UserContext);

    const navigate = useNavigate();

    return (
        <Container>
            <Habitos onClick={() => navigate("/habitos")}>
                Hábitos </Habitos>
            <Hoje onClick={() => navigate("/Hoje")}>
            Hoje </Hoje>
            <Link to={"/hoje"}>
            <CircularProgressbar
                className="circularBar" value={porcentagem} 
                strokeWidth={10}
                styles={buildStyles({
                rotation: 0, textSize: '18px',
                pathTransitionDuration: 0.5,
                pathColor: `white`, textColor: 'white',
                trailColor: 'var(--cor-azul-claro)',
                })}
            />     
            </Link>      
            <Historico onClick={() => navigate("/historico")}>
                Histórico </Historico>
        </Container>
    )
}

const Container = styled.div`
    width: 375px;
    height: 70px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 14px;
    color: var(--cor-azul-claro);
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    border: 1px solid var(--cor-cinza-borda);
    background-color: #FFFFFF;

    .CircularProgressbar {
        width: 91px;
        height: 91px;
        border-radius: 45px;      
        padding: 10px;
        margin-bottom: 30px;
        background-color: var(--cor-azul-claro);
    }
`
const Habitos = styled.p`
    margin-left: 36px;
`
const Hoje = styled.p`
color: white;
position: absolute;
bottom: 42px;
left: 168px;
`
const Historico = styled.p`
    margin-right: 36px;
`
export default Menu;