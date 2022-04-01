import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import TelaLogin from "./TelaLogin";
import TelaLogin2 from "./TelaLogin2";
import TelaCadastro2 from "./TelaCadastro2";

import TelaCadastro from "./TelaCadastro";
import TelaHabitos from "./TelaHabitos";
import TelaHoje from "./TelaHoje";
import TelaHistorico from "./TelaHistorico";

function App() {
    const [token, setToken] = useState(""); // Verificar se existe o token no local storage

    return (
        <UserContext.Provider value={{ token, setToken }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login2" element={<TelaLogin2 />} />
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