import styles from "./ZyrulsTabs.module.css";

function ZyrulsTabs({ active, setActive }: { active: number; setActive: (index: number) => void }) {
    return (
        <div className={styles.tabs}>
            <button type="button" className={`${styles.tab} ${styles.create} ${active === 0 ? styles.active : ""}`} onClick={() => setActive(0)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="27px"
                    fill="#000"
                >
                    <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"></path>
                    <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"></path>
                </svg>
                建立短網址
            </button>
            <button type="button" className={`${styles.tab} ${styles.manage} ${active === 1 ? styles.active : ""}`} onClick={() => setActive(1)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    width="27px"
                    fill="#000"
                >
                    <path d="M280-280h80v-280h-80v280Zm160 0h80v-400h-80v400Zm160 0h80v-160h-80v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"></path>
                </svg>
                管理網址
            </button>
        </div>
    );
}

export default ZyrulsTabs;
