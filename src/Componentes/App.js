import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import TelaLogin from "./TelaLogin";
import TelaCadastro2 from "./TelaCadastro2";

import TelaCadastro from "./TelaCadastro";
import TelaHabitos from "./TelaHabitos";
import TelaHoje from "./TelaHoje";
import TelaHistorico from "./TelaHistorico";

function App() {

    const [token, setToken] = useState(""); // Verificar se existe o token no local storage
    const [perfil, setPerfil] = useState("");

    const context = {token, setToken, perfil, setPerfil};

    return (
        <UserContext.Provider value={context}>
            <BrowserRouter>
                <Routes>
                    <Route path="/cadastro2" element={<TelaCadastro2 />} />
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

// ESTRUTURA DE COMPONENTES ESTILIZADOS DIRETAMENTE NO JSX

// import styled from "styled-components";

// return (
//     <Container>
//         <h1>Olá mundo!</h1>
//     </Container>
// )

// const Container = styled.div `
//     width: 100px;
// 	height: 100px;
// 	background: blue;

// 	h1 {
// 		color: red;
// 	}
// `;

export default App;