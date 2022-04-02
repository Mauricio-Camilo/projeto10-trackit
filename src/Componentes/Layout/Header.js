import { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";

function Header() {

    const { perfil, setPerfil } = useContext(UserContext);

    console.log(perfil);

    return (
        <Container>
            <SubTitle>TrackIt</SubTitle>
            {/* <Background> */}
                <Image src={perfil}></Image>
            {/* </Background> */}
        </Container>
    )
}

const Container = styled.div`
    font-family: 'Playball', cursive;
    width: 375px;
    height: 70px;
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

// const Background = styled.div`
//     width: 51px;
//     height: 51px;
//     background-image: green;
//     background-size: cover;
//     display: flex;
//     justify-content: center;
//     align-items: center;
// `

const Image = styled.img`
    width: 51px;
    height: 51px;
    margin-right: 18px;
    border-radius: 25px;
`

export default Header;