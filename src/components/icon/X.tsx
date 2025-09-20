import styles from "./Link.module.css";

function X({
    color = "#1f68b2",
    size = 35,
    btn = false,
    link = false,
}: {
    color?: string;
    size?: number;
    btn?: boolean;
    link?: boolean;
}) {
    const svg = (
        <svg
            fill={color}
            viewBox="0 0 512 512"
            height={`${size}px`}
            width={`${size}px`}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
        </svg>
    );

    if (link && !btn)
        return (
            <a
                href="https://x.com/zyrenyy"
                target="_blank"
                className={styles.link}
            >
                {svg}
            </a>
        );
    else if (!link && btn)
        return (
            <a
                href="https://x.com/zyrenyy"
                target="_blank"
                className={styles.btn}
            >
                {svg} X
            </a>
        );

    return svg;
}

export default X;
