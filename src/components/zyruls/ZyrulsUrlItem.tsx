import { useEffect, useState } from "react";
import styles from "./ZyrulsUrlItem.module.css";
import ZyrulsCopyMsg from "./ZyrulsCopyMsg";
import deleteUrl from "@/api/zyruls/delete";

function ZyrulsUrlItem({
    code,
    url,
    createdAt,
    setSuccess,
    setMsg,
    setDeleting,
    handleRefresh
}: {
    code: string;
    url: string;
    createdAt: string;
    setSuccess: (success: boolean | null) => void;
    setMsg: (msg: string) => void;
    setDeleting: (deleting: boolean) => void;
    handleRefresh: () => Promise<void>;
}) {
    const [copyMsg, setCopyMsg] = useState<boolean>(false);
    const handleCopy = () => {
        const shortUrl = `zye.me/${code}`;
        navigator.clipboard.writeText(shortUrl || "");
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

    const [displayUrl, setDisplayUrl] = useState<string>(url);
    useEffect(() => {
        if (url.length > 40) setDisplayUrl(url.slice(0, 40) + "...");
    }, [url]);

    const handleDelete = async (code: string) => {
        if (!confirm("你確定要刪除這個短網址嗎？一刪既出駟馬難追。")) return;

        setDeleting(true);
        const data = await deleteUrl(code);
        if (data.success) {
            setMsg(data.message || "短網址刪除成功！");
            setSuccess(true);
            setDeleting(false);
            await handleRefresh();
        } else {
            setMsg(data.message || "短網址刪除失敗，請稍後再試。");
            setSuccess(false);
            setDeleting(false);
        }
    };

    return (
        <div className={styles.item}>
            <div className={styles.info}>
                <div className={styles.url}>
                    <div>
                        <input
                            type="text"
                            name="url"
                            value={`zye.me/${code}`}
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
                        </button>
                    </div>
                    <button type="button" className={styles.delete} onClick={() => handleDelete(code)}>
                        <svg
                            width="27px"
                            height="27px"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 -960 960 960"
                            fill="#fff"
                        >
                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"></path>
                        </svg>
                    </button>
                </div>
                {copyMsg && <ZyrulsCopyMsg onClose={() => setCopyMsg(false)} />}
                <p className={styles["original-url"]}>原始網址：{displayUrl}</p>
                <p className={styles.date}>
                    建立時間：{formatDate(createdAt || "")}
                </p>
            </div>
        </div>
    );
}

export default ZyrulsUrlItem;
