import { useEffect, useState } from "react";
import styles from "./ZyrulsCopyMsg.module.css";

function ZyrulsCopyMsg({ onClose }: { onClose: () => void }) {
    const [animated, setAnimated] = useState<string>("fade-in");
    useEffect(() => {
        setAnimated("fade-in");
        const timer = setTimeout(() => {
            setAnimated("fade-out");
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const handleEnd = () => {
        if (animated === "fade-out") onClose();
    };

    return (
        <div className={`${styles.copied} ${styles.success} ${styles[animated]}`} onAnimationEnd={handleEnd}>
            <p>已複製到剪貼簿！</p>
        </div>
    )
}

export default ZyrulsCopyMsg;