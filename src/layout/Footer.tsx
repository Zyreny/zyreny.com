import styles from "./Footer.module.css";

function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <p>版權聲明 &copy; 2024 - {year} Zyreny</p>
        </footer>
    );
}

export default Footer;
