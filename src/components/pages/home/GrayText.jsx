import styles from "./Home.module.css"

const GrayText = ({value, text}) => {
    return (
        <>
            <div className={styles.value}>{value}</div>
            <div className={styles.text}>{text}</div>
        </>
    )
}

export default GrayText;