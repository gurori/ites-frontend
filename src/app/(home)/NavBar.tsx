import Link from "next/link";

export default function NavBar() {
    return (
        <>
            <Link href="/">Главная</Link>
            <Link href="https://github.com/gurori/ites-frontend">Про сайт</Link>
            <Link href="/about">О нас</Link>
        </>
    )
}