import styles from "./Status.module.css";

function Error({ msg, style }: { msg: string, style?: React.CSSProperties }) {
    return (
        <div className={styles.status} style={{ color: "#da1c1c", ...style }}>
            <svg
                fill="#da1c1c"
                viewBox="0 0 24 24"
                height="60px"
                width="60px"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
            </svg>
            <p>{msg}</p>
        </div>
    );
}

export default Error;
