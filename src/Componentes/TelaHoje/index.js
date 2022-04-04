import { useState, useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import styled from "styled-components";
import dayjs from "dayjs";

import Header from "../Layout/Header";
import Menu from "../Layout/Menu";
import HabitoHoje from "./HabitoHoje";

function TelaHoje() {

    let updateLocale = require('dayjs/plugin/updateLocale')
    dayjs.extend(updateLocale);
  
    dayjs.updateLocale('en', {
      weekdays: [
        "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"
      ]
    })
  
    const dataBR = dayjs().format('dddd, DD/MM')

    const { token, setPercentage, atual, 
            setAtual, recorde, setRecorde } = useContext(UserContext);

    const tokenLS = localStorage.getItem("token");

    // Estado que guarda os habitos que vieram da API
    const [habitosHoje, setHabitosHoje] = useState([]);

    const [habitosConcluidos, setHabitosConcluidos] = useState(0);

    const API = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";

    const config = {
        headers: {
            "Authorization": `Bearer ${tokenLS}`
        }
    }

    useEffect(() => {
        const promise = axios.get(API, config);
        promise.then(response => {
            const { data } = response;
            console.log("Deu bom");
            console.log(data);
            setHabitosHoje(data);
            // console.log(habitosHoje);
        });
        promise.catch(response => {
            console.log("Deu ruim");
        })
    }, []);

    // console.log(habitosConcluidos)

    let resultado = 0;
    resultado = parseInt((habitosConcluidos / habitosHoje.length) * 100);
    setPercentage(resultado);
    return (
        <>
            <Header />
            <Container>
                <Today>{dataBR}</Today>
                {resultado === 0 ?
                    <Nohabits>Nenhum hábito concluído ainda</Nohabits>:
                    <Hashabits>{resultado}% dos hábitos concluídos</Hashabits>
                }
                {habitosHoje.map(habito => {
                    const { id, name, done, currentSequence, highestSequence } = habito;
                    // setAtual(currentSequence);
                    // setRecorde(highestSequence);
                    return (
                        <HabitoHoje key={id} habito={name} id={id} status={done}
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