import { useNavigate } from "react-router-dom";

function Menu () {

    const navigate = useNavigate();

    return (
        <>
        <h1>TELA DE MENU</h1>
        <p onClick={() => navigate("/habitos")}>Hábitos</p>
        <p onClick={() => navigate("/hoje")}>Hoje</p>
        <p onClick={() => navigate("/historico")}>Histórico</p>
        </>
    )
}

export default Menu;