import Image from "next/image";
import LoginForm from "./LoginForm";
import styles from "./Login.module.css";

export default function LoginPage() {
  return (
    <div className="h-screen center bg-black px-4">
      <div className={styles.whiteBox}>
        <Image
          src="/icons/user.svg"
          className="absolute top-0 -translate-y-1/2 drop-shadow-xl"
          alt="user icon"
          width={141}
          height={141}
        />
        <LoginForm />
      </div>
    </div>
  );
}
