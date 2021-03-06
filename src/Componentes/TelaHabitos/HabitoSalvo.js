import axios from "axios";
import styled from "styled-components";

function HabitoSalvo(props) {

    const tokenLS = localStorage.getItem("token");

    const config = {
        headers: {
            "Authorization": `Bearer ${tokenLS}`
        }
    }

    const { id, habito, dias } = props;

    const diasSemana = [{ dia: "D", id: 0 }, { dia: "S", id: 1 }, { dia: "T", id: 2 },
    { dia: "Q", id: 3 }, { dia: "Q", id: 4 }, { dia: "S", id: 5 }, { dia: "S", id: 6 },]

    function deletarHabito () {
        console.log("fui clicado para deletar hábito");
        let confirma = window.confirm("Deseja mesmo deletar o hábito?");
        if (confirma) {
        const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,
        config);
        promise.then (response => {
            window.location.reload();
        });
        promise.catch(err => alert(err.response.statusText));
    }
        else {
            return <></>
        }   
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
    max-width: 340px;
    min-height: 91px;
    border-radius: 5px;
    padding-bottom: 10px;
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
    max-width: 340px;
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
    gap: 4px;
    margin-left: 19px;
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
    background-color: ${(props) => corBotao(props.selecionado)};; 
`
export default HabitoSalvo;