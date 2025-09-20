import styles from "./Loading.module.css";

function Loading({ style }: { style?: React.CSSProperties }) {
    return (
        <div className={styles.loading} style={style}>
            <div className={styles.loader} />
            <p>載入中...</p>
        </div>
    );
}

export default Loading;
