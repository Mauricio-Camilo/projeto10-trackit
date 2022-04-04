import { useContext, useEffect } from "react";
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
  
    const dataBR = dayjs().format('dddd, DD/MM');

    const { porcentagem, setPorcentagem,
        habitosHoje, setHabitosHoje, 
        habitosConcluidos, setHabitosConcluidos} = useContext(UserContext);

    const tokenLS = localStorage.getItem("token");

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
            setHabitosHoje(data);
        });
        promise.catch(err => console.log(err.response.statusText));
    }, []);

    setPorcentagem(parseInt((habitosConcluidos / habitosHoje.length) * 100));

        return (
            <>
                <Header />
                <Container>
                    <Today>{dataBR}</Today>
                    {porcentagem <= 0 ?
                        <Nohabits>Nenhum hábito concluído ainda</Nohabits>:
                        <Hashabits>{porcentagem}% dos hábitos concluídos</Hashabits>    
                    }
                    {habitosHoje.map(habito => {
                        const { id, name, done, currentSequence, highestSequence } = habito;
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
    min-height: 94px;
    height: 100%;
    min-height: 677px;
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