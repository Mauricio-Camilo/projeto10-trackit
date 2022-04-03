import { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import styled from "styled-components";


function HabitoSalvo(props) {

    const { token, setToken } = useContext(UserContext);

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    const { id, habito, dias } = props;

    const diasSemana = [{ dia: "D", id: 0 }, { dia: "S", id: 1 }, { dia: "T", id: 2 },
    { dia: "Q", id: 3 }, { dia: "Q", id: 4 }, { dia: "S", id: 5 }, { dia: "S", id: 6 },]

    function deletarHabito () {
        console.log("fui clicado para deletar hábito");
        const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,
        config);
        promise.then (response => {
            const {data} = response;
            console.log("deu bom");
            console.log(data);}
        )
        promise.catch(err => {
            console.log("Deu ruim");
        })
    }

    return (
        <>
            <Container>
                <Div>
                    <p>{habito}</p>
                    <Icon onClick={() => deletarHabito()}>
                        <ion-icon name="trash-outline"></ion-icon>
                    </Icon>
                </Div>
                <Days>
                    {diasSemana.map(dia => {
                        let checkSelecionado = dias.includes(dia.id);
                        return (
                            <DayWeek key={dia.id} id={dia.id} selecionado={checkSelecionado}>
                                {dia.dia}
                            </DayWeek>)
                    })
                    }
                </Days>
            </Container>
        </>
    )
}

function corBotao(selecionado) {
    if (selecionado) return "(--cor-cinza-dias)";
    else return "#FFFFFF";
}

const Container = styled.div`
    width: 340px;
    height: 91px;
    border-radius: 5px;
    margin: 0 auto;
    margin-bottom: 30px;
    background-color: #FFFFFF;

    p {
        font-size: 20px;
        color: var(--cor-cinza-letras);
        padding: 13px 0;
        padding-left: 14px;

    }
`

const Div = styled.div`
    display: flex;
    justify-content: space-between;
`

const Icon = styled.button`
    font-size: 20px;
    border: none;
    background-color: #FFFFFF;
    padding-top: 8px;
    padding-right: 10px;
`

const Days = styled.div`
    display: flex;
    margin-left: -4px;
    padding-right: 50px;
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
    background-color: ${(props) => corBotao(props.selecionado)};; 
`


export default HabitoSalvo;

