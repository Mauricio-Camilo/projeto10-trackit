import { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";

import styled from "styled-components";

function HabitoHoje(props) {

    const { habito, contagemAtual, contagemRecorde, 
        id, concluidos, setConcluidos } = props;

    const { token, setToken } = useContext(UserContext);

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    function marcarHabito () {
        SetAtual(atual+1);
        setConcluidos(concluidos+1);
        console.log("Marcar hábito como concluido");
            const promise = axios.post(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,
            {},config)
            promise.then(response => {
                const {data} = response;
                console.log(data);
                console.log("Deu bom para marcar hábito");
            })
            promise.catch(err => console.log(err.response.statusText));
    }

    function desmarcarHabito () {
        SetAtual(atual-1);
        setConcluidos(concluidos-1);
        console.log("Remover hábito da lista");
        const promise = axios.post(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,
            {},config)
            promise.then(response => {
                const {data} = response;
                console.log(data);
                console.log("Deu bom para desmarcar hábito");
            })
            promise.catch(err => console.log(err.response.statusText));
    }

    function toggle () {
        setIconeSelecionado(!iconeSelecionado);
        // console.log(iconeSelecionado);
        console.log("Entrar no if");
        if (iconeSelecionado === true) marcarHabito();
        else desmarcarHabito();
    }


    // Estado usado para mudar a cor do icone ao ser clicado
    const [iconeSelecionado, setIconeSelecionado] = useState(true);

    // Estados usados para renderizar na tela a contagem dos hábitos
    const [atual, SetAtual] = useState(contagemAtual);
    const [recorde, SetRecorde] = useState(contagemRecorde);

    /* Estado criado apenas para testar a lógica, modificar depois o
    código colocando o estado de cima, recorde, que pega os dados da API */
    const [aux, setAux] = useState(1);

    return (
        <Container>
            <div>
                <h1>{habito}</h1>
                <Atual selecionado={iconeSelecionado}> 
                Sequência Atual: <span> {atual} 
                {atual === 1? " dia" : " dias"} 
                </span> 
                </Atual>
                <Recorde atual={atual} recorde={aux}> 
                Seu recorde: <span> {aux} 
                {aux === 1? " dia" : " dias"} 
                </span> 
                </Recorde>
            </div>
            <Icon onClick={() => toggle()} selecionado={iconeSelecionado}>
                <ion-icon name="checkbox"></ion-icon>
            </Icon>
        </Container>
    )
}

function corIcone (selecionado) {
    /* Por algum motivo esse selecionado está invertido em relação ao estado
    por isso coloquei o not nele */
    if (!selecionado) return "blue";
    else return "gray";
}

function corAtual (selecionado) {
    if (!selecionado) return "blue";
    else return "black";
}

function corRecorde (atual, recorde) {
    if (atual < recorde) return "black"
    else return "blue"
}

const Container = styled.div`
    width: 340px;
    height: 91px;
    border-radius: 5px;
    border: 1px solid black;
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    padding-left: 10px;
    background-color: #FFFFFF;

    h1 {
        margin: 10px 0;
    }
`
const Atual = styled.p`
    span {
        color: ${(props) => corAtual(props.selecionado)};
`
const Recorde = styled.p`
    span {
        color: ${(props) => corRecorde(props.atual, props.recorde)};
`

const Icon = styled.button`
    font-size: 25px;
    background-color: white;
    border: none;
    color: ${(props) => corIcone(props.selecionado)};
`




export default HabitoHoje