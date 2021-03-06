import styled from "styled-components";

function Header() {

    const perfilLS = localStorage.getItem("perfil");

    return (
        <Container>
            <SubTitle>TrackIt</SubTitle>
                <Image src={perfilLS}></Image>
        </Container>
    )
}

const Container = styled.div`
    font-family: 'Playball', cursive;
    width: 375px;
    height: 70px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    background-color: var(--cor-azul-escuro);
`
const SubTitle = styled.h2`
    font-size: 39px;
    color: white;
    padding-left: 18px;
`
const Image = styled.img`
    width: 51px;
    height: 51px;
    margin-right: 18px;
    border-radius: 25px;
`
export default Header;