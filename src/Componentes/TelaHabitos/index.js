import { useState, useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";

import styled from "styled-components";

import Header from "../Layout/Header";
import Menu from "../Menu";
import HabitoSalvo from "./HabitoSalvo";
import InserirHabito from "./InserirHabito";
import axios from "axios";

function TelaHabitos() {

    const { token, setToken, perfil, setPerfil } = useContext(UserContext);

    const [dadosHabito, setDadosHabito] = useState([]);

    /* Os dois estaod abaixo foram criados aqui e passados para os filhos, assim
    o input mantém os dados digitados enquanto não for enviado para a API */

    // Estado criado que salva o hábito digitado no input
    const [habito, setHabito] = useState();

    // Mapa criado que armazena os dias da semana clicados na construção do hábito
    const [diasSelecionados, setDiasSelecionados] = useState(new Map());

    const API = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    useEffect(() => {
        const promise = axios.get(API, config);
        promise.then(response => {
            const { data } = response;
            // console.log("Deu bom");
            // console.log(data);
            setDadosHabito(data);
        });
        promise.catch(response => {
            console.log("Deu ruim");
        })
    }, []);

    const [visivel, setVisivel] = useState(false);

        return (
            <>
                <Header />
                {visivel ?
                    <Container>
                        <Subtitle>
                            <h1>Meus habitos</h1>
                            <button>+</button>
                        </Subtitle>
                        <InserirHabito setVisivel={setVisivel} 
                        habito = {habito} setHabito={setHabito}
                        diasSelecionados ={diasSelecionados} 
                        setDiasSelecionados = {setDiasSelecionados}
                        />
                        {dadosHabito.map (dado => {
                            return (
                                <HabitoSalvo key={dado.id} id={dado.id} habito={dado.name}
                            dias={dado.days} />
                            )
                        })}
                        <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                    </Container>
                    :
                    <Container>
                        <Subtitle>
                            <h1>Meus habitos</h1>
                            <button onClick={() => setVisivel(true)}>+</button>
                        </Subtitle>
                        {dadosHabito.map (dado => {
                            return (
                                <HabitoSalvo key={dado.id} id={dado.id} habito={dado.name}
                            dias={dado.days} />
                            )
                        })}
                        <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                    </Container>
                }
            </>
        )
}

const Container = styled.div`
    background-color: #E5E5E5;
    width: 375px;
    height: 597px;
    margin: 70px 0;

        p {
            font-size: 18px;
            padding-left: 17px;
            padding-right: 20px;
        }
    `
const Subtitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 22px;
    padding-bottom: 28px;


        h1 {
            font-size: 23px;
            color: var(--cor-subtitulo);
            padding-left: 17px;
        }

        button {
            font-size: 27px;
            color: white;
            width: 40px;
            heigth: 35px;
            border-radius: 5px;
            margin-right: 18px;
            background-color: var(--cor-botao-footer)
        }
`

export default TelaHabitos;