import { useEffect, useState, useCallback } from "react";
import styles from "./BackToTop.module.css";

interface BackToTopProps {
    threshold?: number;
    smooth?: boolean;
}

function BackToTop({ threshold = 700, smooth = true }: BackToTopProps) {
    const [show, setShow] = useState(false);

    const onScroll = useCallback(() => {
        const y = window.scrollY || document.documentElement.scrollTop;
        setShow(y > threshold);
    }, [threshold]);

    useEffect(() => {
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, [onScroll]);

    const handleClick = () => {
        if ("scrollBehavior" in document.documentElement.style && smooth) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            window.scrollTo(0, 0);
        }
    };

    return (
        <button
            type="button"
            aria-label="回到頂端"
            className={`${styles.btn} ${show ? styles.show : ""}`}
            onClick={handleClick}
        >
            <svg
                fill="#fff"
                viewBox="0 0 448 512"
                height="20px"
                width="20px"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"></path>
            </svg>
        </button>
    );
}

export default BackToTop;
