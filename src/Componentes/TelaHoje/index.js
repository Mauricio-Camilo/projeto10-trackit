import { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Topo from "../Topo";
import Menu from "../Menu";

function TelaHoje() {

    const { token, setToken } = useContext(UserContext);

    const navigate = useNavigate();
    
    return (
        <>
            <Topo />
            <h1>TELA DE HOJE</h1>
            <Menu />
        </>
    )
}

export default TelaHoje;