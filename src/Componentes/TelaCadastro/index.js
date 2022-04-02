import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/logo.svg";
import { Grid } from 'react-loader-spinner';


function TelaCadastro() {

    const loading = <Grid color="#FFFFFF" height={25} width={50} />;
    const [selecionado, setSelecionado] = useState(false);
    const [cadastrar, setCadastrar] = useState("Cadastrar");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [foto, setFoto] = useState("");


    const API = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up";

    const navigate = useNavigate();

    function resetarInputs () {
        setEmail("");
        setSenha("");
        setNome("");
        setFoto("");
    }

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
            resetarInputs();
        })
    }
    return (
        <>
            <Container selecionado={selecionado}>
                <Logo src={logo}></Logo>
                <form onSubmit={cadastrarDados}>
                    <div>
                        <Inputs selecionado={selecionado}>
                        <input type="text" placeholder="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email} required>
                        </input>
                        <input type="password" placeholder="senha"
                            onChange={(e) => setSenha(e.target.value)}
                            value={senha} required>
                        </input>
                        <input type="text" placeholder="nome"
                            onChange={(e) => setNome(e.target.value)}
                            value={nome} required>
                        </input>
                        <input type="text" placeholder="foto"
                            onChange={(e) => setFoto(e.target.value)}
                            value={foto} required>
                        </input>
                        </Inputs>
                    </div>
                    <Cadastrar selecionado={selecionado} type="submit">{cadastrar}</Cadastrar>
                </form>
                <Hiperlink onClick={() => navigate("/")}>
                Já tem uma conta? Faça login!</Hiperlink>
            </Container>
        </>
    )
}

function mudarBotao(selecionado) {
    if (selecionado) return "0.7";
    else return "1";
}

function resetarBotao(selecionado) {
    if (selecionado) return "none";
    else return "";
}

function corInput(selecionado) {
    if (selecionado) return "var(--cor-cinza-check)";
    else return "#FFFFFF";
}

const Container = styled.div`
    width: 375px;
    height: 667px;

    input {
        background-color: ${(props) => corInput(props.selecionado)};
        pointer-events: ${(props) => resetarBotao(props.selecionado)};;
    } 
`
const Logo = styled.img`
    margin: 0 98px;
    margin-top: 68px;
    margin-bottom: 33px;
`
const Inputs = styled.div`
    input {
        width: 303px;
        height: 45px;
        padding-left: 11px;
        margin-left: 35px;
        margin-bottom: 6px;
        background-color: ${(props) => corInput(props.selecionado)};
        pointer-events: ${(props) => resetarBotao(props.selecionado)};;
    }
    `
const Cadastrar = styled.button`
    font-size: 22px;
    color: #FFFFFF;
    width: 303px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-left: 35px;
    margin-bottom: 25px;
    opacity: ${(props) => mudarBotao(props.selecionado)};
    background-color: var(--cor-azul-claro);
    pointer-events: ${(props) => resetarBotao(props.selecionado)};
`
const Hiperlink = styled.p`
    font-size: 14px;
    text-align: center;
    text-decoration: underline;
    color: var(--cor-azul-claro);
  
`

export default TelaCadastro;
