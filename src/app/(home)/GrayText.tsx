import { FC } from "react";
import styles from "./Home.module.css";

function formatNumber(number: number): string {
    const prefixes = ['', 'K', 'M'];
    const index = Math.floor(Math.log10(Math.abs(number)) / 3);
    const formattedNumber = (number / Math.pow(1000, index));
    return `${formattedNumber}${prefixes[index]}`;
  }

const GrayText: FC<{ value: number; text: string }> = ({ value, text }) => {
  return (
    <>
      <div className={styles.value}>{formatNumber(value)}+</div>
      <div className={styles.text}>{text}</div>
    </>
  );
};

export default GrayText;
