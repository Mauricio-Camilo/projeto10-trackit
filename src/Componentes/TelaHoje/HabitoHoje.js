import { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";

import styled from "styled-components";

function HabitoHoje(props) {

    const { habito, ContagemAtual, ContagemRecorde, id } = props;

    const { token, setToken } = useContext(UserContext);

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    function toggle () {
        setIconeSelecionado(!iconeSelecionado);
        console.log(iconeSelecionado);
        console.log("Entrar no if");
        if (iconeSelecionado === true) {
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
        else {
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
    }


    // Estado usado para mudar a cor do icone ao ser clicado
    const [iconeSelecionado, setIconeSelecionado] = useState(true);

    const [atual, SetAtual] = useState(ContagemAtual);
    const [recorde, SetRecorde] = useState(ContagemRecorde);

    return (
        <Container>
            <div>
                <h1>{habito}</h1>
                <p>Sequência Atual: {atual} dias</p>
                <p>Seu recorde: {recorde} dias </p>
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
    if (!selecionado) return "green";
    else return "gray";
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


const Icon = styled.button`
    font-size: 25px;
    background-color: white;
    border: none;
    color: ${(props) => corIcone(props.selecionado)};
`




export default HabitoHoje