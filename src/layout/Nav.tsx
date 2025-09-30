import styles from "./Nav.module.css";

function Nav({
    navBtns = [
        { id: "home", name: "首頁", path: "/" },
        { id: "projects", name: "作品", path: "/projects" }
    ],
}) {
    return (
        <>
            <header className={styles.header}>
                <a href="#" className={styles["logo-link"]}>
                    <img
                        src="/img/logo/logo_full.svg"
                        alt="Zyreny"
                        className={styles.logo}
                    />
                </a>

                <nav className={styles.nav}>
                    <ul>
                        {navBtns.map((btn, i) => {
                            return (
                                <li key={i} className={styles["nav-btn"]}>
                                    <a href={btn.path}>{btn.name}</a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </header>

            <nav className={styles["btm-nav"]}>
                <ul>
                    {navBtns.map((btn, i) => {
                        return (
                            <li key={i} className={styles["btm-nav-btn"]}>
                                <a href={btn.path}>
                                    <img
                                        src={`/img/nav/${btn.id}.svg`}
                                        alt={`${btn.name}圖標`}
                                    />
                                    {btn.name}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
}

export default Nav;
