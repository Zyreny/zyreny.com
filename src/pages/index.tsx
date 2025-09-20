import styles from "./Index.module.css";

import nyan from "@assets/img/home/nyan.gif";
import arrow from "@assets/img/home/arrow.svg";

import {
    SEO,
    AutoOrder,
    IndexBlock,
    NewsList,
    ProjectsList,
    Email,
    Discord,
    Instagram,
    Threads,
    X,
    Medium,
    Github,
} from "@comp";

const navBtns = [
    { id: "home", name: "首頁", path: "#" },
    { id: "about", name: "關於", path: "#About" },
    { id: "projects", name: "作品", path: "#Projects" },
    { id: "news", name: "新聞", path: "#News" },
    { id: "contact", name: "聯絡", path: "#Contact" },
];

function Index() {
    return (
        <>
            <SEO />

            <div className={styles.top}>
                <div className={styles["top-overlay"]}></div>
                <h1>Zyreny</h1>
                <h2>創造、探索、突破</h2>
            </div>

            <AutoOrder>
                <IndexBlock title="關於我" className="about" id="About">
                    <div className={styles.profile}>
                        <img src={nyan} alt="" />
                        <p>
                            嗨，我是 <b>Zyreny</b>，一個來自臺中的國中生。
                            <span className={styles.br}></span>
                            喜歡 <b>程式開發、平面設計、攝影、UI/UX、深度報導</b>，
                            <span className={styles.br}></span>
                            現在專注在 <b>網頁前端開發</b>、設計喜歡極簡風、
                            <span className={styles.br}></span>
                            正在學習 <b>C++, React</b>
                        </p>
                    </div>

                    <div className={styles.links}>
                        <Email link={true} />
                        <Discord link={true} />
                        <Instagram link={true} />
                        <Threads link={true} />
                        <Medium link={true} />
                        <X link={true} />
                        <Github link={true} />
                    </div>
                </IndexBlock>

                <IndexBlock
                    title="作品集"
                    desc="這裡會放我最新的四個作品，各有特色。"
                    className="projects"
                    id="Projects"
                >
                    <ProjectsList endpoint="4" />

                    <a href="/projects" className={styles["view-all"]}>
                        看全部
                        <img src={arrow} alt=">" />
                    </a>
                </IndexBlock>

                <IndexBlock
                    title="新聞"
                    desc="這裡會放關於我或這個網站的最新消息。"
                    id="News"
                >
                    <NewsList />
                </IndexBlock>
                <IndexBlock
                    title="聯絡"
                    desc="如果你對於我有任何問題、建議或想和我聊天，可以用底下這些方式找我："
                    id="Contact"
                >
                    <div className={styles["contact-btns"]}>
                        <Email btn={true} />
                        <Discord btn={true} />
                        <Instagram btn={true} />
                        <Threads btn={true} />
                        <X btn={true} />
                    </div>
                </IndexBlock>
            </AutoOrder>
        </>
    );
}

Index.navBtns = navBtns;

export default Index;
