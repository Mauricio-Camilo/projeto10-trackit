import {useState} from "react";
import styled from "styled-components";


function HabitoSalvo(props) {

    const { id, habito, dias } = props;

    const diasSemana = [{ dia: "D", id: 0 }, { dia: "S", id: 1 }, { dia: "T", id: 2 },
    { dia: "Q", id: 3 }, { dia: "Q", id: 4 }, { dia: "S", id: 5 }, { dia: "S", id: 6 },]

    return (
        <>
            <Container>
                <p>{habito}</p>
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
    if (selecionado) return "gray";
    else return "white";
}

const Container = styled.div`
    width: 340px;
    height: 91px;
    border-radius: 5px;
    margin: 0 auto;
    margin-bottom: 0px;
    background-color: #FFFFFF;

    p {
        font-size: 20px;
        color: var(--cor-cinza-input);
        padding: 13px 0;
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
    background-color: ${(props) => corBotao(props.selecionado)};; 
`

const Days = styled.div`
    display: flex;
    padding-right: 50px;
`
export default HabitoSalvo;

