import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TelaCadastro() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [foto, setFoto] = useState("");

    const API = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up";

    const navigate = useNavigate();

    function cadastrarDados() {
        const promise = axios.post(API, {
            email: email,
            name: nome,
            image: foto,
            password: senha
        });
        promise.then(response => {
            const { data } = response;
            console.log(data);
            console.log("deu bom");
            navigate("/");
        }
        )
        promise.catch(response => {
            alert("Falha no envio dos dados, por favor tente novamente");
        })
    }
    return (
        <>
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
                <input type="text" placeholder="nome"
                    onChange={(e) => setNome(e.target.value)}
                    value={nome}>
                </input>
                <input type="text" placeholder="foto"
                    onChange={(e) => setFoto(e.target.value)}
                    value={foto}>
                </input>
            </div>
            <button onClick={cadastrarDados}>Cadastrar</button>
                <p onClick={() => navigate("/")}>Já tem uma conta? Faça login!</p>
        </>
    )
}

export default TelaCadastro;