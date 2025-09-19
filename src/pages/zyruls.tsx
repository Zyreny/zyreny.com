import { useState } from "react";
import styles from "./zyruls.module.css";

import { SEO, ZyrulsCreate, ZyrulsManage, ZyrulsTabs } from "@comp";

function Zyruls() {
    const [active, setActive] = useState(0);
    const renderContent = (activeTab: number) => {
        switch (activeTab) {
            case 0:
                return <ZyrulsCreate />;
            case 1:
                return <ZyrulsManage />;
            default:
                return null;
        }
    }

    return (
        <>
            <SEO
                title="Zyruls 縮網址"
                desc="Zyruls 是一個用來縮短網址的工具，把原本可能近100個字的連結縮短成約10個字、甚至更少！"
            />

            <div className={styles.container}>
                <div className={styles.card}>
                    <ZyrulsTabs active={active} setActive={setActive} />
                    <div className={styles.content}>
                        {renderContent(active)}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Zyruls;