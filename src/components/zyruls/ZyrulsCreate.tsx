import { useState } from "react";
import styles from "./ZyrulsCreate.module.css";
import { SpinLoading, ZyrulsCopyMsg, ZyrulsInput, ZyrulsMsg } from "@comp";
import createUrl, { type UrlData } from "@api/zyruls/create";

function ZyrulsCreate() {
    const handleSectionToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget;
        const content = button.nextElementSibling as HTMLElement;
        content.classList.toggle(styles["active"]);
        button.classList.toggle(styles["active"]);
    };

    const [success, setSuccess] = useState<boolean | null>(null);
    const [msg, setMsg] = useState<string>("");
    const [data, setData] = useState<UrlData>({} as UrlData);
    const [loading, setLoading] = useState<boolean>(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        const data = await createUrl(e);
        setLoading(false);

        if (data.success && data.data) {
            (e.target as HTMLFormElement).reset();
            setData(data.data);
            setSuccess(true);
            setMsg(data.message || "短網址建立成功！");
        } else {
            setSuccess(false);
            setMsg(data.message || "短網址建立失敗，請稍後再試。");
        }
    };

    const [copyMsg, setCopyMsg] = useState<boolean>(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(data?.shortUrl || "");
        setCopyMsg(true);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${year}年${month}月${day}日 ${hours}點${minutes}分`;
    };

    return (
        <>
            {success !== null && (
                <ZyrulsMsg
                    success={success}
                    msg={msg}
                    onClose={() => setSuccess(null)}
                />
            )}
            <form onSubmit={handleSubmit}>
                <ZyrulsInput
                    id="url"
                    type="url"
                    label="原始網址"
                    placeholder="https://example.zyreny.com/your/long/url"
                    required={true}
                />

                <div className={styles["form-row"]}>
                    <ZyrulsInput
                        id="customCode"
                        label="自訂代碼"
                        placeholder="custom_link"
                        note="3-20個字符，只能包含字母、數字、連字號和底線"
                    />
                    <ZyrulsInput
                        id="exp"
                        type="datetime-local"
                        label="過期時間"
                    />
                </div>

                <ZyrulsInput psd={true} />

                <div className={styles["section"]}>
                    <button
                        type="button"
                        id="sectionToggle"
                        className={styles["section-toggle"]}
                        onClick={handleSectionToggle}
                    >
                        社群預覽
                        <svg
                            width="20px"
                            height="20px"
                            className={styles["icon-svg"]}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 -960 960 960"
                            fill="#174879"
                        >
                            <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"></path>
                        </svg>
                    </button>
                    <div className={styles["section-content"]}>
                        <p className={styles.note}>
                            短網址在社群媒體（如 Facebook、Twitter、Instagram
                            等）上的預覽效果
                        </p>
                        <ZyrulsInput
                            id="metaTitle"
                            label="自訂標題"
                            placeholder="Zyruls 縮網址"
                            note="最多100字符"
                        />
                        <ZyrulsInput
                            id="metaDesc"
                            type="textarea"
                            label="自訂描述"
                            placeholder="Zyruls 是一個用來縮短網址的工具，把原本可能近100個字的連結縮短成約10個字、甚至更少！"
                            note="最多300字符"
                        />
                        <ZyrulsInput
                            id="metaImage"
                            type="url"
                            label="縮圖網址"
                            placeholder="https://example.zyreny.com/og_img.png"
                            note="建議尺寸：1200x630 像素，支援 JPG、PNG、GIF"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className={`${styles["submit-btn"]} ${
                        loading ? styles.loading : ""
                    }`}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <SpinLoading /> 載入中...
                        </>
                    ) : (
                        "建立短網址"
                    )}
                </button>
            </form>

            {data?.shortUrl && (
                <div className={styles.result}>
                    <h3>短網址已建立！</h3>
                    <div className={styles["result-row"]}>
                        <input
                            type="text"
                            id="resultUrl"
                            value={data?.shortUrl}
                            readOnly
                        />
                        <button
                            type="button"
                            className={styles.copy}
                            onClick={handleCopy}
                        >
                            <svg
                                width="20px"
                                height="20px"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 -960 960 960"
                                fill="#fff"
                            >
                                <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"></path>
                            </svg>
                            複製
                        </button>
                    </div>
                    {copyMsg && (
                        <ZyrulsCopyMsg onClose={() => setCopyMsg(false)} />
                    )}
                    <p className={styles.note}>
                        建立時間：{formatDate(data?.createdAt)}（台灣時間）
                    </p>
                </div>
            )}
        </>
    );
}

export default ZyrulsCreate;
