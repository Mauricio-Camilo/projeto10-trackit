import { useState, useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Topo from "../Topo";
import Menu from "../Menu";
import HabitoHoje from "./HabitoHoje";

function TelaHoje() {

    const { token, setToken } = useContext(UserContext);

    const [habitosHoje, setHabitosHoje] = useState([]);

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


    return (
        <>
            {/* <Topo /> */}
            <h1>TELA DE HOJE</h1>
            <h1> COLOCAR O DIA DE HOJE USANDO BIBLIOTECA</h1>
            {habitosHoje.map(habito => {
                const { id, name, currentSequence, highestSequence } = habito;
                return (
                    <HabitoHoje key={id} habito={name} id={id}
                        atual={currentSequence} recorde={highestSequence}
                    />
                )
            })

            }
            {/* <Menu /> */}
        </>
    )
}

export default TelaHoje;