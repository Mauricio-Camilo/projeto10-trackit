import styled from "styled-components";

function HabitoHoje(props) {
    const { habito, atual, recorde, id } = props;
    return (
        <Container>
            <div>
                <h1>{habito}</h1>
                <p>Sequência Atual: {atual} dias</p>
                <p>Seu recorde: {recorde} dias </p>
            </div>
            <Icon>
                <ion-icon name="checkbox"></ion-icon>
            </Icon>
        </Container>
    )
}

const Container = styled.div`
    width: 340px;
    height: 91px;
    border-radius: 5px;
    border: 1px solid black;
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    padding-left: 10px;
    background-color: #FFFFFF;

    h1 {
        margin: 10px 0;
    }
`


const Icon = styled.button`
    font-size: 25px;
    background-color: white;
    border: none;
    color: green;
`




export default HabitoHoje