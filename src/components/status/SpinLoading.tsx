import styles from "./SpinLoading.module.css";

function SpinLoading({
    size = 20,
    color = "var(--theme-color)",
    border = 3,
    bgColor = "#f5f5f5",
}: {
    size?: number;
    color?: string;
    border?: number;
    bgColor?: string;
}) {
    return (
        <div
            className={styles.loading}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                border: `${border}px solid ${bgColor}`,
                borderTop: `${border}px solid ${color}`,
            }}
        ></div>
    );
}

export default SpinLoading;
