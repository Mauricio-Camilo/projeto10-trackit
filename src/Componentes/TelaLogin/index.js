import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TelaLogin () {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const API = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";

    const navigate = useNavigate();


    function fazerLogin() {
        const promise = axios.post(API, {
            email: email,
            password: senha
        });
        promise.then(response => {
            const { data } = response;
            console.log(data);
            console.log("deu bom");
            // navigate("/");
        }
        )
        promise.catch(response => {
            alert("Falha no envio dos dados, por favor tente novamente");
        })
    }

    return (
        <>
        <h1>TELA LOGIN</h1>
        <h1>TELA DE CADASTRO</h1>
        <h1>TrackIt</h1>
        <div>
            <input type="text" placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}>
            </input>
            <input type="password" placeholder="senha"
                onChange={(e) => setSenha(e.target.value)}
                value={senha}>
            </input>
        </div>
            <button onClick={fazerLogin}>Entrar</button>
            <p onClick={() => navigate("/cadastro")}>Não tem uma conta? Cadastre-se</p>
            </>
    )
}

export default TelaLogin;