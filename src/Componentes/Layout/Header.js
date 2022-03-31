import styled from "styled-components";

function Header() {
    return (
        <Titulo>
            <h1>Topo</h1>
        </Titulo>
    )
}

const Titulo = styled.div`
    background-color: var(--cor-fundo-topo);
    width: 375px;
    font-family: 'Playball', cursive;

        h1 {
            color: #FFFFFF;
        }
`

export default Header;