import { Discord, Email, Instagram, Medium, Threads, X } from "@comp";
import styles from "./Footer.module.css";

function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <p>版權聲明 &copy; 2024 - {year} Zyreny</p>
            <div className={styles.links}>
                <Email link={true} color="#fff" size={30} />
                <Discord link={true} color="#fff" size={30} />
                <Instagram link={true} color="#fff" size={30} />
                <Threads link={true} color="#fff" size={30} />
                <Medium link={true} color="#fff" size={30} />
                <X link={true} color="#fff" size={30} />
            </div>
        </footer>
    );
}

export default Footer;