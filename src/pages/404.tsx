import { SEO, HomeButton } from "@comp";
import { useState, useEffect, useMemo } from "react";

import styles from "./404.module.css";

function NotFound() {
    const path = window.location.pathname;
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);

    const lines = useMemo(
        () => [
            `$ curl https://zyreny.com${path}`,
            "錯誤代碼 404: 找不到頁面",
            "$ echo 按下方按鈕返回首頁",
            "按下方按鈕返回首頁",
        ],
        [path]
    );

    const isCommandLine = (line: string | undefined) => line?.startsWith("$");

    useEffect(() => {
        const currentLine = lines[currentLineIndex];
        if (!currentLine) return;

        const isCommand = isCommandLine(currentLine);
        const delay = isCommand ? 90 : 0;

        if (isCommand && currentCharIndex < currentLine.length) {
            const timer = setTimeout(() => {
                setDisplayedLines((prev) => {
                    const newLines = [...prev];
                    newLines[currentLineIndex] = currentLine.slice(
                        0,
                        currentCharIndex + 1
                    );
                    return newLines;
                });
                setCurrentCharIndex((prev) => prev + 1);
            }, delay);

            return () => clearTimeout(timer);
        } else {
            if (!isCommand) {
                setDisplayedLines((prev) => {
                    const newLines = [...prev];
                    newLines[currentLineIndex] = currentLine;
                    return newLines;
                });
            }

            const timer = setTimeout(
                () => {
                    setCurrentLineIndex((prev) => prev + 1);
                    setCurrentCharIndex(0);
                },
                isCommand ? 800 : 300
            );

            return () => clearTimeout(timer);
        }
    }, [currentLineIndex, currentCharIndex, lines]);

    return (
        <>
            <SEO
                title="找不到頁面 - Zyreny"
                desc="這個頁面不存在或是已經被刪除了，但你還是可以返回首頁看關於我的介紹和作品集。"
            />

            <div className={styles.container}>
                <div className={styles.terminal}>
                    <div className={styles["title-bar"]}>
                        <button
                            type="button"
                            name="關閉"
                            className={styles.close}
                        ></button>
                        <button
                            type="button"
                            name="最小化"
                            className={styles.min}
                        ></button>
                        <button
                            type="button"
                            name="最大化"
                            className={styles.max}
                        ></button>
                    </div>
                    <div className={styles["screen"]}>
                        {displayedLines.map((line, index) => (
                            <p key={index}>
                                {line}
                                {index === currentLineIndex &&
                                    currentLineIndex < lines.length &&
                                    lines[currentLineIndex] &&
                                    currentCharIndex <
                                        lines[currentLineIndex].length &&
                                    isCommandLine(lines[currentLineIndex]) && (
                                        <span className={styles.cursor}></span>
                                )}
                            </p>
                        ))}
                    </div>
                </div>
                <HomeButton />
            </div>
        </>
    );
}

export default NotFound;
