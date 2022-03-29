import { BrowserRouter, Routes, Route } from "react-router-dom";

import TelaLogin from "./TelaLogin";
import TelaCadastro from "./TelaCadastro";
import TelaHabitos from "./TelaHabitos";
import TelaHoje from "./TelaHoje";
import TelaHistorico from "./TelaHistorico";

function App () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TelaLogin />}/>
                <Route path="/cadastro" element={<TelaCadastro />}/>
                <Route path="/habitos" element={<TelaHabitos />}/>
                <Route path="/hoje" element={<TelaHoje />}/>
                <Route path="/historico" element={<TelaHistorico />}/>
            </Routes>
        </BrowserRouter>
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