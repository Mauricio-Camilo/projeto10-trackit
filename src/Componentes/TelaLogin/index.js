import { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/logo.svg";
import { ThreeDots } from 'react-loader-spinner';

function TelaLogin() {

    const { setToken, setPerfil } = useContext(UserContext);

    const loading = <ThreeDots color="#FFFFFF" />;
    const [entrar, setEntrar] = useState("Entrar");

    const [selecionado, setSelecionado] = useState(false);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const API = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";

    const navigate = useNavigate();

    function fazerLogin(event) {
        event.preventDefault();
        setEntrar(loading);
        setSelecionado(true);
        const promise = axios.post(API, {
            email: email,
            password: senha
        });
        promise.then(response => {
            const { data } = response;
            setToken(data.token);
            setPerfil(data.image);
            localStorage.setItem("token", data.token);
            localStorage.setItem("perfil", data.image);
            navigate("/habitos"); 
        }
        )
        promise.catch(response => {
            alert("Informações incorretas, digite novamente email e senha");
            setSelecionado(false);
            setEntrar("Entrar");
            setEmail("");
            setSenha("");
        })
    }

    return (

        <Container>
            <Logo src={logo}></Logo>
            <form onSubmit={fazerLogin}>
                <Inputs selecionado={selecionado}>
                    <input type="text" placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email} required>
                    </input>
                    <input type="password" placeholder="senha"
                        onChange={(e) => setSenha(e.target.value)}
                        value={senha} required>
                    </input>
                </Inputs>
                <Login selecionado={selecionado} type="submit">{entrar}</Login>
            </form>
            <Hiperlink onClick={() => navigate("/cadastro")}>
                Não tem uma conta? Cadastre-se </Hiperlink>
        </Container>
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
const Login = styled.button`
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
    background-color: var(--cor-azul-claro);
    opacity: ${(props) => mudarBotao(props.selecionado)};
    pointer-events: ${(props) => resetarBotao(props.selecionado)};
`
const Hiperlink = styled.p`
    font-size: 14px;
    text-align: center;
    text-decoration: underline;
    color: var(--cor-azul-claro);
`
export default TelaLogin;