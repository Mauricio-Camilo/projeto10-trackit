import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import TelaLogin from "./TelaLogin";
import TelaCadastro from "./TelaCadastro";
import TelaHabitos from "./TelaHabitos";
import TelaHoje from "./TelaHoje";
import TelaHistorico from "./TelaHistorico";

function App() {

    const [token, setToken] = useState(""); 
    const [perfil, setPerfil] = useState("");

// Estados usados na tela hoje e menu
    const [porcentagem, setPorcentagem] = useState(0);
    const [habitosHoje, setHabitosHoje] = useState([]);
    const [habitosConcluidos, setHabitosConcluidos] = useState(0);

    const context = {token, setToken, perfil, setPerfil, porcentagem, setPorcentagem,
        habitosHoje, setHabitosHoje, habitosConcluidos, setHabitosConcluidos,
        };
        
    return (
        <UserContext.Provider value={context}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<TelaLogin />} />
                    <Route path="/cadastro" element={<TelaCadastro />} />
                    <Route path="/habitos" element={<TelaHabitos />} />
                    <Route path="/hoje" element={<TelaHoje />} />
                    <Route path="/historico" element={<TelaHistorico />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}

export default App;