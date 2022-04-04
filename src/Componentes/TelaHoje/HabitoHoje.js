import { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";


import styled from "styled-components";

function HabitoHoje(props) {

    const { habito, contagemAtual, contagemRecorde,
        id, status, concluidos, setConcluidos } = props;

    const tokenLS = localStorage.getItem("token");

    const config = {
        headers: {
            "Authorization": `Bearer ${tokenLS}`
        }
    }

    function marcarHabito() {
        console.log("entrei em marcar habito");
        console.log(iconeSelecionado);
        setAtual(atual + 1);
        setConcluidos(concluidos + 1);
        const promise = axios.post(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,
            {}, config)
        promise.then(response => {
            const { data } = response;
            console.log("Deu bom");
        })
        promise.catch(err => console.log(err.response.statusText));
    }

    function desmarcarHabito() {
        console.log("entrei em desmarcar habito");
        console.log(iconeSelecionado);
        setAtual(atual - 1);
        setConcluidos(concluidos - 1);
        const promise = axios.post(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,
            {}, config)
        promise.then(response => {
            const { data } = response;
            console.log("Deu bom");
        })
        promise.catch(err => console.log(err.response.statusText));
    }

    function toggle() {
        setIconeSelecionado(!iconeSelecionado);
        if (iconeSelecionado === false) marcarHabito();
        else desmarcarHabito();
    }

    function toggle2() {
        setIconeSelecionado(!iconeSelecionado);
        if (iconeSelecionado === false) desmarcarHabito();
        else marcarHabito();
    }

    // Estado usado para mudar a cor do icone ao ser clicado
    const [iconeSelecionado, setIconeSelecionado] = useState(false);

    // Estados usados para renderizar na tela a contagem dos hábitos
    const [atual, setAtual] = useState(contagemAtual);
    const [recorde, setRecorde] = useState(contagemRecorde);

    return (

        <Container>
            {!status ?
                <>             
                <div>
                    <h1>{habito}</h1>
                    <Atual selecionado={iconeSelecionado}>
                        Sequência atual: <span> {atual}
                            {atual === 1 ? " dia" : " dias"}
                        </span>
                    </Atual>
                    <Recorde atual={atual} recorde={recorde}>
                        Seu recorde: <span> {recorde}
                            {recorde === 1 ? " dia" : " dias"}
                        </span>
                    </Recorde>
                </div>
                    <Icon onClick={() => toggle()} selecionado={iconeSelecionado}>
                        <ion-icon name="checkbox"></ion-icon>
                    </Icon>
                </>
                :
                <>             
                <div>
                    <h1>{habito}</h1>
                    <Atual selecionado={!iconeSelecionado}>
                        Sequência atual: <span> {atual}
                            {atual === 1 ? " dia" : " dias"}
                        </span>
                    </Atual>
                    <Recorde atual={atual} recorde={recorde}>
                        Seu recorde: <span> {recorde}
                            {recorde === 1 ? " dia" : " dias"}
                        </span>
                    </Recorde>
                </div>
                    <Icon onClick={() => toggle2()} selecionado={!iconeSelecionado}>
                        <ion-icon name="checkbox"></ion-icon>
                    </Icon>
                </>}
        </Container>
    )
}

function corIcone(selecionado) {
    if (selecionado) return "var(--cor-verde)";
    else return "var(--cor-cinza-check)";
}

function corAtual(selecionado) {
    if (selecionado) return "var(--cor-verde)";
    else return "black";
}

function corRecorde(atual, recorde) {
    if (atual < recorde) return "black"
    else return "var(--cor-verde)"
}

const Container = styled.div`
    width: 340px;
    min-height: 94px;
    border-radius: 5px;
    border: 1px solid var(--cor-cinza-borda);
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
    margin: 10px 0;
    margin-left: 18px;
    background-color: #FFFFFF;

    h1 {
        font-size: 20px;
        color: var(--cor-cinza-letras);
        padding-top: 13px;
        padding-left: 15px;
        margin-bottom: 7px;

    }
`
const Atual = styled.p`
    font-size: 13px;
    color: var(--color-cinza-letras);
    padding-left: 15px;
    margin-bottom: 3px;

    span {
        color: ${(props) => corAtual(props.selecionado)};
`
const Recorde = styled.p`
    font-size: 13px;
    color: var(--color-cinza-letras);
    padding-left: 15px;

    span {
        color: ${(props) => corRecorde(props.atual, props.recorde)};
`

const Icon = styled.button`
    font-size: 69px;
    background-color: #FFFFFF;
    border: none;
    color: ${(props) => corIcone(props.selecionado)};
    padding-top: 10px;
`
export default HabitoHoje