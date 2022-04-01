import { useState, useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Topo from "../Topo";
import Menu from "../Menu";
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
    resultado = parseInt((habitosConcluidos/habitosHoje.length)*100)
    // console.log(resultado);

    return (
        <>
            {/* <Topo /> */}
            <h1>TELA DE HOJE</h1>
            <h1> COLOCAR O DIA DE HOJE USANDO BIBLIOTECA</h1>
            {resultado === 0 ?
                <p>Nenhum hábito concluído ainda</p> :
                <p>{resultado}% dos hábitos concluídos</p>
            }
            {habitosHoje.map(habito => {
                const { id, name, currentSequence, highestSequence } = habito;
                return (
                    <HabitoHoje key={id} habito={name} id={id}
                        contagemAtual={currentSequence} contagemRecorde={highestSequence}
                        concluidos={habitosConcluidos}
                        setConcluidos={(valor) => setHabitosConcluidos(valor)}
                    />
                )
            })
            }
            {/* <Menu /> */}
        </>
    )
}

export default TelaHoje;