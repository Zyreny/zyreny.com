import { HomeButton, Question, SEO } from "@comp";
import styles from "./Food.module.css";
import { useEffect } from "react";

const navBtns = [
    { id: "home", name: "首頁", path: "/" },
    { id: "projects", name: "作品", path: "/projects" },
    { id: "question", name: "第1題", path: "#question1" },
    { id: "question", name: "第10題", path: "#question10" },
    { id: "question", name: "第20題", path: "#question20" },
];

function Food() {
    useEffect(() => {
        document.documentElement.style.scrollPaddingTop = "10rem";

        const mediaQuery = window.matchMedia("(max-width: 768px)");
        const handleMediaChange = (e: MediaQueryListEvent) => {
            document.documentElement.style.scrollPaddingTop = e.matches
                ? "calc(10rem - 20px)"
                : "10rem";
        };

        if (mediaQuery.matches) {
            document.documentElement.style.scrollPaddingTop =
                "calc(10rem - 20px)";
        }

        mediaQuery.addEventListener("change", handleMediaChange);

        return () => {
            document.documentElement.style.scrollPaddingTop = "";
            mediaQuery.removeEventListener("change", handleMediaChange);
        };
    }, []);

    const questions = [
        "咖哩",
        "皮蛋豆腐",
        "滷肉飯",
        "挫冰",
        "涼麵",
        "提拉米蘇",
        "石鍋拌飯",
        "麻醬麵",
        "丼飯",
        "蛋糕",
        "布丁",
        "焗烤飯",
        "蝦仁炒飯",
        "義大利麵",
        "米糕",
        "優格",
        "奶蓋",
        "酥皮濃湯",
        "雞絲飯",
        "OREO冰炫風",
        "粥+肉鬆",
        "沙拉",
        "炸醬麵",
        "粽子",
        "豆花",
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = document.getElementById("quiz") as HTMLFormElement;
        const formData = new FormData(form);
        const counts = { 拌人: 0, 不拌人: 0, 中壢人: 0 };

        for (let i = 1; i <= questions.length; i++) {
            const answer = formData.get(`question${i}`);
            if (answer === "1") counts.拌人++;
            else if (answer === "-1") counts.不拌人++;
            else counts.中壢人++;
        }

        let result: keyof typeof counts = "中壢人";
        for (const answer in counts) {
            const key = answer as keyof typeof counts;
            if (counts[key] > counts[result]) {
                result = key;
            }
        }

        alert(`恭喜！你是 ${result} ！`);
        form.reset();
    };

    return (
        <>
            <SEO
                title="拌不拌測驗"
                desc="這個有趣的拌不拌測驗只需要回答25個問題，就可以快速簡單測出你是「拌人」還是「不拌人」！"
                img="https://react.zyreny.com/img/og/food.png"
                url="https://react.zyreny.com/food"
                bodyBg="#dbe9ff"
            />

            <div className={styles.container}>
                <h1 className="title" style={{ fontSize: "3rem" }}>
                    拌不拌測驗
                </h1>
                <form className={styles.quiz} id="quiz" onSubmit={handleSubmit}>
                    <hr />
                    {questions.map((item, index) => (
                        <Question
                            key={index}
                            index={String(index + 1)}
                            name={item}
                        />
                    ))}

                    <button type="submit" className="btn-outline">
                        查看結果
                    </button>
                </form>
                <HomeButton />
            </div>
        </>
    );
}

Food.navBtns = navBtns;
export default Food;
