import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Grid } from  'react-loader-spinner';


function TelaCadastro() {

    const loading = <Grid color="red" height={50} width={80} />;  
    const [selecionado, setSelecionado] = useState(false);         
    const [cadastrar, setCadastrar] = useState ("Cadastrar");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [foto, setFoto] = useState("");


    const API = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up";

    const navigate = useNavigate();

    function cadastrarDados(event) {
        event.preventDefault();
        console.log("fui clicado");
        setCadastrar(loading);
        setSelecionado(true);
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
            setCadastrar("Cadastrar")
            setSelecionado(false);
        })
    }
    return (
        <>
            <Container selecionado={selecionado}>
            <h1>TELA DE CADASTRO</h1>
            <h1>TrackIt</h1>
            <form onSubmit={cadastrarDados}>
            <div>
                <input type="text" placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} required>
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
            <Cadastrar selecionado={selecionado} type="submit">{cadastrar}</Cadastrar>
            </form>    
                <p onClick={() => navigate("/")}>Já tem uma conta? Faça login!</p>

                </Container> 
        </>
    )
}

function corBotao (selecionado) {
    if (selecionado) return "green";
    else return "blue";
}

function resetarBotao (selecionado) {
    if (selecionado) return "none";
    else return "";
}

function corInput (selecionado) {
    if (selecionado) return "gray";
    else return "white";
}

const Container = styled.div `
    input {
        background-color: ${(props) => corInput(props.selecionado)};
        pointer-events: ${(props) => resetarBotao(props.selecionado)};;
    }
  
`
const Cadastrar = styled.button `
    font-size: 35px;
    color: #FFFFFF;
    width: 200px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-left: 19px;
    background-color: ${(props) => corBotao(props.selecionado)};
    pointer-events: ${(props) => resetarBotao(props.selecionado)};
`


export default TelaCadastro;
