import { Link } from "react-router-dom"

export default function NavBar() {
    return (
        <>
            <Link to="/">Главная</Link>
            <Link to="https://github.com/gurori/ites">Про сайт</Link>
            <Link to="/about">О нас</Link>
        </>
    )
}