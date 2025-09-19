import { useEffect, useState } from "react";
import styles from "./ZyrulsMsg.module.css";

function ZyrulsMsg({
    success,
    msg,
    onClose,
}: {
    success: boolean;
    msg: string;
    onClose: () => void;
}) {
    const [animated, setAnimated] = useState<string>("fade-in");

    useEffect(() => {
        setAnimated("fade-in");
        const timer = setTimeout(() => {
            setAnimated("fade-out");
        }, 3000);

        return () => clearTimeout(timer);
    }, [success, msg, onClose]);

    const handleEnd = () => {
        if (animated === "fade-out") onClose();
    };

    return (
        <div
            className={`${styles.msg} ${
                success ? styles.success : styles.error
            } ${styles[animated]}`}
            onAnimationEnd={handleEnd}
        >
            <span>{msg}</span>
        </div>
    );
}

export default ZyrulsMsg;