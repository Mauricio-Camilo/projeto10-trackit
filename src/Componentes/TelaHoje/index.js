import { useState, useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Header from "../Layout/Header";
import Menu from "../Layout/Menu";
import HabitoHoje from "./HabitoHoje";

function TelaHoje() {

    const { token, setToken } = useContext(UserContext);

    // Estado que guarda os habitos que vieram da API
    const [habitosHoje, setHabitosHoje] = useState([]);

    const [habitosConcluidos, setHabitosConcluidos] = useState(0);

    const navigate = useNavigate();

    const API = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    useEffect(() => {
        const promise = axios.get(API, config);
        promise.then(response => {
            const { data } = response;
            console.log("Deu bom");
            console.log(data);
            setHabitosHoje(data);
        });
        promise.catch(response => {
            console.log("Deu ruim");
        })
    }, []);

    console.log(habitosConcluidos)

    let resultado = 0;
    resultado = parseInt((habitosConcluidos / habitosHoje.length) * 100)
    // console.log(resultado);

    return (
        <>
            <Header />
            <Container>
                <Today>COLOCAR O DIA DE HOJE</Today>
                {resultado === 0 ?
                    <Nohabits>Nenhum hábito concluído ainda</Nohabits>:
                    <Hashabits>{resultado}% dos hábitos concluídos</Hashabits>
                }
                {habitosHoje.map(habito => {
                    const { id, name, currentSequence, highestSequence } = habito;
                    return (
                        <HabitoHoje key={id} habito={name} id={id}
                            contagemAtual={currentSequence} contagemRecorde={highestSequence}
                            concluidos={habitosConcluidos}
                            setConcluidos={(valor) => setHabitosConcluidos(valor)} />
                    )
                })
                }
            </Container>
            <Menu />
        </>
    )
}


const Container = styled.div`
    background-color: #E5E5E5;
    width: 375px;
    height: 597px;
    padding-bottom: 100px;
    margin: 70px 0;
`
const Today = styled.h2`
    font-size: 23px;
    color: var(--cor-azul-escuro);
    padding-top: 28px;
    margin-bottom: 3px;
    margin-left: 18px;
`
const Nohabits = styled.p`
    font-size: 18px;
    color: var(--cor-cinza-hoje);
    margin-left: 18px;
`

const Hashabits = styled.p`
    font-size: 18px;
    color: var(--cor-verde);
    margin-left: 18px;
`



export default TelaHoje;