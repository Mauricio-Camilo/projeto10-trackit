import { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";

import styled from "styled-components";
import { Grid } from  'react-loader-spinner';

import axios from "axios";

function InserirHabito(props) {

    const loading = <Grid color="#FFFFFF" height={20} width={50} />;

    const {setVisivel, habito, setHabito, 
    diasSelecionados, setDiasSelecionados} = props;

    const { token, setToken } = useContext(UserContext);

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    const APIPost = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";

    // Estado criado para colocar a animação de loading no botão de salvar
    const [salvar, setSalvar] = useState("Salvar");

    // Estado criado para desabilitar o botão enquanto a pagina está carregando
    const [selecionado, setSelecionado] = useState(false);

    // Lista para fazer um map dos dias da semana e seus ids
    const dias = [{ dia: "D", id: 0 }, { dia: "S", id: 1 }, { dia: "T", id: 2 },
    { dia: "Q", id: 3 }, { dia: "Q", id: 4 }, { dia: "S", id: 5 }, { dia: "S", id: 6 },]

    // Estado usado para esconder a tela de criar hábitos ao clicar no botão cancelar
    const [cancelarHabito, setCancelarHabito] = useState(false);

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

/* Função criada para colocar os estados em condição de esconder a tela de 
criar hábitos e reabilitar o botão de + no componente pai de inserir hábitos */
    function ResetarHabito() {
        setCancelarHabito(true);
        setVisivel(false);
        setHabito();
        setDiasSelecionados(new Map());
    }

/* Função que faz o post para o servidor do hábito criado, e também faz o efeito
de cancelar, para colocar a tela no estado inicial */
    function SalvarHabito() {
        setSalvar(loading);
        setSelecionado(true);
        const promise = axios.post(APIPost, {
            name: habito,
            days: [...diasSelecionados.keys()] // Pega apenas os ids do mapa
        }, config);
        promise.then(response => {
            // const { data } = response;
            // console.log("deu bom");
            ResetarHabito();
        }
        )
        promise.catch(response => {
            alert("Falha no envio dos dados, por favor tente novamente");
            ResetarHabito();
        })
    }

    console.log(habito);

    // COLOCAR O FORM COM REQUIRED NESSE INPUT
    return (
        <>
            {cancelarHabito ?
                <></> :
                <Container selecionado={selecionado}>
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
                        <Cancelar onClick={() => ResetarHabito()}>Cancelar</Cancelar>
                        <Button selecionado={selecionado} onClick={() => SalvarHabito()}>{salvar}</Button>
                    </Actions>
                </Container>
            }
        </>
    )
}

/* Função que responde a um determinado estado vindo do mapa por props que vai alterar
a cor do botão ao clicar no dia da semana, a cor depende apenas do estado */
function corBotao(selecionado) {
    if (selecionado) return "var(--cor-cinza-dias)";
    else return "#FFFFFF";
}

function mudarBotao(selecionado) {
    if (selecionado) return "0.7";
    else return "1";
}

function resetarBotao (selecionado) {
    if (selecionado === true) return "none";
    else return "display";
}

function corInput(selecionado) {
    if (selecionado) return "var(--cor-cinza-check)";
    else return "#FFFFFF";
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
            color: var(--cor-cinza-letras);
            border-radius: 5px;
            border: 1px solid var(--cor-cinza-borda);
            margin: 0 19px;
            margin-top: 18px;
            margin-bottom: 10px;
            padding-left: 11px;
            background-color: ${(props) => corInput(props.selecionado)};
            pointer-events: ${(props) => resetarBotao(props.selecionado)};;
        }
`

const Days = styled.div`

     display: flex;
     margin-right: 15px;
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


const Actions = styled.div`
    display: flex;
    justify-content: right;
    align-items: center;
    padding-top: 29px;
    padding-right: 16px;
`
const Button = styled.button`
    font-size: 16px;
    color: #FFFFFF;
    width: 84px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: var(--cor-azul-claro)
    margin-left: 10px;
    background-color: var(--cor-azul-claro);
    opacity: ${(props) => mudarBotao(props.selecionado)};
    pointer-events: ${(props) => resetarBotao(props.selecionado)}; 
`

const Cancelar = styled.p`
    font-size: 16px;
    color: var(--cor-azul-claro);
`
export default InserirHabito;

