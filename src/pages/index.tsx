import styles from "./Index.module.css";

import nyan from "@assets/img/home/nyan.gif";
import arrow from "@assets/img/home/arrow.svg";

import {
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
    SEO,
} from "@comp";

const navBtns = [
    { id: "home", name: "首頁", path: "#" },
    { id: "about", name: "關於", path: "#About" },
    { id: "projects", name: "作品", path: "#Projects" },
    { id: "store", name: "商店", path: "#Store" },
    { id: "news", name: "新聞", path: "#News" },
    { id: "contact", name: "聯絡", path: "#Contact" },
];

function Index() {
    return (
        <>
            <SEO 
                title="Zyreny - 首頁"
                description="我是Zyreny，一個喜歡程式設計的國中生，這裡有一些奇怪有趣的網頁專案作品。"
                url="/"
                image="/og_img.png"
            />
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
                            喜歡 <b>寫程式、平面設計、攝影、哲學、社會心理學</b>
                            ，<span className={styles.br}></span>
                            現在專注在 <b>網頁前端開發</b>、設計風格是極簡風、
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
                    </div>
                </IndexBlock>

                <IndexBlock
                    title="作品集"
                    desc="這裡會放我最新的四個作品，各有特色。"
                    className="projects"
                    id="Projects"
                >
                    <ProjectsList />

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
                        <Medium btn={true} />
                        <X btn={true} />
                    </div>
                </IndexBlock>
            </AutoOrder>
        </>
    );
}

Index.navBtns = navBtns;

export default Index;
