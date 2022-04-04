import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import TelaLogin from "./TelaLogin";
import TelaCadastro from "./TelaCadastro";
import TelaHabitos from "./TelaHabitos";
import TelaHoje from "./TelaHoje";
import TelaHistorico from "./TelaHistorico";

function App() {

    const [token, setToken] = useState(""); // Verificar se existe o token no local storage
    const [perfil, setPerfil] = useState("");
    const [percentage, setPercentage] = useState("");

    const [atual, setAtual] = useState(0);
    const [recorde, setRecorde] = useState(0);

    const context = {token, setToken, perfil, setPerfil, percentage, setPercentage,
                    atual, setAtual, recorde, setRecorde };

    // const tokenLS = localStorage.setItem("token", token);

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