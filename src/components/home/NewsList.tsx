import { useEffect, useState } from "react";
import styles from "./NewsList.module.css";
import { Loading, NewsCard, Error, NoData } from "@comp";
import { getNews } from "@api/news";

function NewsList() {
    const [news, setNews] = useState<{ [key: string]: string }[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getNews()
            .then((data) => {
                setNews(data || []);
                setLoading(false);
            })
            .catch(() => {
                setNews(null);
                setLoading(false);
            });
    }, []);

    const [page, setPage] = useState<number>(1);
    const pageSize = 3;

    const totalPages = Math.ceil((news ?? []).length / pageSize);
    const startIndex = (page - 1) * pageSize;
    const currentNews = (news ?? []).slice(startIndex, startIndex + pageSize);

    return loading ? (
        <Loading />
    ) : news === null ? (
        <Error msg="新聞載入錯誤" />
    ) : news.length === 0 ? (
        <NoData msg="沒有最新消息" />
    ) : (
        <>
            <div className={styles.list}>
                {currentNews.map((item, i) => (
                    <NewsCard
                        key={String(i)}
                        title={item.title}
                        content={item.content}
                        category={item.category}
                        categoryZH={item.categoryZH}
                        date={item.created_at}
                    />
                ))}
            </div>

            <div className={styles.btns}>
                {page > 1 && (
                    <button
                        type="button"
                        className={styles.btn}
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    >
                        上一頁
                    </button>
                )}
                {page < totalPages && (
                    <button
                        type="button"
                        className={styles.btn}
                        onClick={() =>
                            setPage((prev) => Math.min(prev + 1, totalPages))
                        }
                    >
                        下一頁
                    </button>
                )}
            </div>
        </>
    );
}

export default NewsList;
