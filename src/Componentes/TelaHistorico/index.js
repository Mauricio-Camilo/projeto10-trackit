import styled from "styled-components";
import Header from "../Layout/Header";
import Menu from "../Layout/Menu";

function TelaHistorico() {
    return (
        <>
            <Header />
            <Container>
                <h1>Histórico</h1>
                <Text>Em breve você poderá ver o Histórico
                    dos seus hábitos aqui!
                </Text>
            </Container>
            <Menu />
        </>
    )
}

const Container = styled.div`
    background-color: #E5E5E5;
    width: 375px;
    height: 667px;
    padding-bottom: 100px;
    margin-top: 70px;
    margin-bottom: 70px;

        h1 {
            font-size: 18px;
            color: var(--cor-azul-escuro);
            padding-top: 20px;
            margin-left: 17px;
        }
`
const Text = styled.p`
    font-size: 18px;
    color: var(--cor-cinza-letras);
    padding-top: 20px;
    margin-left: 17px;
`

export default TelaHistorico;