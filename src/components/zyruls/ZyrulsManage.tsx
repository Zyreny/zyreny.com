import { useEffect, useState } from "react";
import styles from "./ZyrulsManage.module.css";
import listUrls from "@api/zyruls/list";
import { Loading, ZyrulsUrlItem, ZyrulsMsg, NoData } from "@comp";
import type { UrlItem } from "@api/zyruls/list";

function ZyrulsManage() {
    const [loading, setLoading] = useState<boolean>(true);
    const [urls, setUrls] = useState<UrlItem[]>([]);
    useEffect(() => {
        const fetchUrls = async () => {
            const cachedData = localStorage.getItem("urlsData");
            if (cachedData) setUrls(JSON.parse(cachedData));
            else {
                const data = await listUrls();
                localStorage.setItem("urlsData", JSON.stringify(data.urls));
                setUrls(data.urls);
            }
            setLoading(false);
        };
        fetchUrls();
    }, []);

    const [refreshing, setRefreshing] = useState<boolean>(false);
    const handleRefresh = async () => {
        setRefreshing(true);
        const data = await listUrls();
        localStorage.setItem("urlsData", JSON.stringify(data.urls));
        setUrls(data.urls);
        setRefreshing(false);
    };

    const [success, setSuccess] = useState<boolean | null>(null);
    const [msg, setMsg] = useState<string>("");
    const [deleting, setDeleting] = useState<boolean>(false);

    return (
        <>
            {success !== null && (
                <ZyrulsMsg
                    success={success}
                    msg={msg}
                    onClose={() => setSuccess(null)}
                />
            )}
            <button
                type="button"
                className={styles.refresh}
                onClick={handleRefresh}
            >
                <svg
                    width="24px"
                    height="24px"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    fill="#174879"
                >
                    <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"></path>
                </svg>
                更新列表
            </button>
            {loading || refreshing || deleting ? (
                <Loading />
            ) : urls.length === 0 ? (
                <NoData msg="你還沒建立短網址" />
            ) : (
                <div className={styles.list}>
                    {urls.map((url) => {
                        return (
                            <ZyrulsUrlItem
                                key={url.code}
                                code={url.code}
                                url={url.url}
                                createdAt={url.createdAt}
                                setSuccess={setSuccess}
                                setMsg={setMsg}
                                handleRefresh={handleRefresh}
                                setDeleting={setDeleting}
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
}

export default ZyrulsManage;
