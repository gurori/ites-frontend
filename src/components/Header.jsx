import { Link } from "react-router-dom";

const Header = () => {
     return (
        <header className="flex items-center gap-8 relative px-8">
            <Link onClick={() => window.location.reload()}>
                <img src="/logos/ites-purple-small.svg" alt="logo"  className="-mb-4"/>
            </Link>
            <select name="" id="">
                <option value="">РУС</option>
                <option value="">ENG</option>
                <option value="">САХ</option>
            </select>
            {/* TODO */}
            <nav className="flex items-center absolute right-8 gap-16">
                <Link to="/">Главная</Link>
                <Link to="/">Про сайт</Link>
                <Link to="/">О нас</Link>
                <Link to="/">Войти</Link>
            </nav>
        </header>
     )
}

export default Header;