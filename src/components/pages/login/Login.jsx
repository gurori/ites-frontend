import { Link } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
  return (
    <div className="h-screen center bg-black px-4">
      <div className={styles.whiteBox}>
        <img src="/icons/user.png" className="absolute size-40 top-0 -translate-y-1/2" alt="user icon" />
        <form className="grid place-items-center gap-8" action="">
          <div className="grid gap-5">
          <input type="email" className="white drop-shadow" placeholder="почта" />
          <input type="password" className="white drop-shadow" placeholder="пароль" />
          </div>
          <button type="submit" className={styles.button}>Войти</button>
        </form>
        <Link className="text-[#4B4443]">Ещё не зарегистрированы?</Link>
      </div>
    </div>
  );
}
