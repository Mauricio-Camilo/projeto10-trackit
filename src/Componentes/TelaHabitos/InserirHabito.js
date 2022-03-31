import { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";

import styled from "styled-components";
import axios from "axios";

function InserirHabito(props) {

    const { token, setToken } = useContext(UserContext);

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    const APIPost = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";

    const dias = [{ dia: "D", id: 0 }, { dia: "S", id: 1 }, { dia: "T", id: 2 },
    { dia: "Q", id: 3 }, { dia: "Q", id: 4 }, { dia: "S", id: 5 }, { dia: "S", id: 6 },]

    const [cancelarHabito, setCancelarHabito] = useState(false);

    const [habito, setHabito] = useState();

    const [diasSelecionados, setDiasSelecionados] = useState(new Map());

    console.log(diasSelecionados);

    function selecionarDia(dia, id) {
        const jaSelecionado = diasSelecionados.has(id); // Pergunta pro meu estado se ele já tem esse id, retorna true ou false
        if (jaSelecionado) { // Se eu já tinha selecionado e clicar de novo
            diasSelecionados.delete(id); // eu preciso tirar o id do mapa
            setDiasSelecionados(new Map(diasSelecionados)); // atualizo o mapa sem o id que acabei de clicar
        }
        else { // Se eu estou clicando pela primeira vez
            setDiasSelecionados(new Map(diasSelecionados.set(id, dia)));
            // atualizo o mapa colocando as informações do id e do dia nele.
        }
    }

    function ResetarHabito() {
        setCancelarHabito(true);
        props.setVisivel(false);
    }

    function SalvarHabito() {
        console.log("fui clicado");
        const promise = axios.post(APIPost, {
            name: habito,
            days: [...diasSelecionados.keys()] // Pega apenas os ids do mapa
        }, config);
        promise.then(response => {
            const { data } = response;
            console.log(data);
            console.log("deu bom");
            ResetarHabito();
        }
        )
        promise.catch(response => {
            alert("Falha no envio dos dados, por favor tente novamente");
            ResetarHabito();
        })
    }

    console.log(habito);
    return (
        <>
            {cancelarHabito ?
                <></> :
                <Container>
                    <input type="text" placeholder="nome do hábito"
                        onChange={(e) => setHabito(e.target.value)}
                        value={habito}>
                    </input>
                    <Days>
                        {dias.map(dia => {
                            const checkSelecionado = diasSelecionados.has(dia.id)
                            // Meus dias selecionados tem esse id? Lembrando que o id é iterado
                            // Cada vez que clico em um dia, o estado é alterado, então o componente é novamente renderizado.
                            // Ao clicar, eu atualizo meu mapa, então esse if vai achar o id no mapa
                            // Ao achar o id no mapa, vai alterar a prop abaixo de selecionado para true
                            return (
                                <DayWeek key={dia.id} selecionado={checkSelecionado} onClick={() => selecionarDia(dia.dia, dia.id)}>
                                    {dia.dia}
                                </DayWeek>)
                        }
                        )}
                    </Days>
                    <Actions>
                        <p onClick={() => ResetarHabito()}>Cancelar</p>
                        <button onClick={() => SalvarHabito()}>Salvar</button>
                    </Actions>
                </Container>
            }
        </>
    )
}

function corBotao(selecionado) {
    if (selecionado) return "gray";
    else return "white";
}

const Container = styled.div`
    width: 340px;
    height: 200px;
    border-radius: 5px;
    margin: 0 auto;
    margin-bottom: 28px;
    background-color: #FFFFFF;

        input {
            width: 303px;
            height: 45px;
            font-size: 20px;
            color: var(--cor-cinza-input);
            border-radius: 5px;
            border: 1px solid var(--cor-cinza-borda);
            margin: 18px 19px;
            padding-left: 11px;
        }
`

const DayWeek = styled.button`
    font-size: 19px;
    color: var(--cor-cinza-borda);
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: 1px solid var(--cor-cinza-borda);
    margin-left: 19px;
    margin-right: 1px;
    background-color: ${(props) => corBotao(props.selecionado)}; 
`
// Essa props selecionado serve para ver se eu cliquei ou não no dia
// Quando o botão é clicado, ele chama essa função pata alterar a cor dependendo do clique.

const Days = styled.div`

    display: flex;
    padding-right: 50px;
    background-color: blue;
`
const Actions = styled.div`
    display: flex;
    justify-content: right;
    align-items: center;
    padding-top: 29px;
    padding-right: 16px;


        p {
            font-size: 16px;
            color: var(--cor-botao-footer);
        }

        button {
            font-size: 16px;
            color: #FFFFFF;
            width: 84px;
            height: 35px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
            margin-left: 19px;
            background-color: var(--cor-botao-footer);
        }
`

export default InserirHabito;

