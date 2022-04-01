import { useState, useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";

import styled from "styled-components";

import Topo from "../Topo";
import Menu from "../Menu";
import HabitoSalvo from "./HabitoSalvo";
import InserirHabito from "./InserirHabito";
import axios from "axios";

function TelaHabitos() {

    const { token, setToken } = useContext(UserContext);
    const [dadosHabito, setDadosHabito] = useState([]);


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
            console.log("Deu bom");
            console.log(data);
            setDadosHabito(data);
        });
        promise.catch(response => {
            console.log("Deu ruim");
        })
    }, []);

    const [visivel, setVisivel] = useState(false);

    console.log(dadosHabito);

        return (
            <>
                <Topo />
                {visivel ?
                    <Container>
                        <Subtitle>
                            <h1>Meus habitos</h1>
                            <button>+</button>
                        </Subtitle>
                        <InserirHabito setVisivel={setVisivel} />
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