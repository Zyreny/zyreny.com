import { useEffect, useState } from "react";
import styles from "./Index.module.css";
import docs from "@/data/docs.json"
import fm from "front-matter";
import { BackToHome, NoData, SEO } from "@/components";

interface DocItem {
    href?: string;
    title: string;
    description?: string;
    lastEdited: string;
}

function Index() {
    const sortDocs = (allDocs: DocItem[]) => {
        const sortedDocs = allDocs.sort((a, b) => {
            const dateA = new Date(a.lastEdited);
            const dateB = new Date(b.lastEdited);
            return dateB.getTime() - dateA.getTime();
        });
        return sortedDocs;
    }

    const [data, setData] = useState<DocItem[]>([]);
    const [filteredDocs, setFilteredDocs] = useState<DocItem[]>(data);
    useEffect(() => {
        const fetchAllDocs = async () => {
            const promises = Object.entries(docs).map(async ([key]) => {
                const docKey = key as keyof typeof docs;
                try {
                    const res = await fetch(`/docs/${key}/${docs[docKey].index}`);
                    const text = await res.text();
                    let { attributes }: { attributes: DocItem } = fm(text);

                    if (!attributes.title) {
                        attributes = {
                            title: key.toUpperCase(),
                            description: `${key} 相關文檔`,
                            lastEdited: new Date().toLocaleDateString()
                        };
                    }

                    const data = {
                        ...attributes,
                        href: `${key}`
                    }

                    return data as DocItem;
                } catch (error) {
                    console.error(`Error fetching ${key}:`, error);
                    return {
                        title: key.toUpperCase(),
                        description: `${key} 相關文檔`,
                        lastEdited: new Date().toLocaleDateString(),
                    } as DocItem;
                }
            });

            const allDocs = await Promise.all(promises);
            const sortedDocs = sortDocs(allDocs);

            setData(sortedDocs);
            setFilteredDocs(sortedDocs);
        };

        fetchAllDocs();
    }, [])

    const [searchTerm, setSearchTerm] = useState<string>("");
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        if (e.target.value.trim() === "") {
            const sortedDocs = sortDocs(data);
            setFilteredDocs(sortedDocs);
            return;
        }
        const filteredDocs = data.filter(doc =>
            doc.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
            (doc.description && doc.description.toLowerCase().includes(e.target.value.toLowerCase())) ||
            (doc.href && doc.href.toLowerCase().includes(e.target.value.toLowerCase())) ||
            (doc.lastEdited && doc.lastEdited.toLowerCase().includes(e.target.value.toLowerCase()))
        );
        setFilteredDocs(filteredDocs);
    }

    return (
        <>
            <SEO title="文檔中心" desc="這裡有各種我專案的 API 或其他的文檔" />

            <div className={styles.container}>
                <h1 className="title">文檔中心</h1>
                <div className={styles.content}>
                    <input type="text" className={`${styles.search} input`} value={searchTerm} onChange={(e) => handleSearch(e)} name="searchInput" id="searchInput" placeholder="搜尋文檔..." />
                    {filteredDocs.length === 0 ? (
                        <NoData msg="找不到相關文檔" />
                    ) : (
                        filteredDocs.map((doc, i) => (
                            <a key={i} className={styles.card} href={`/docs/${doc.href}`}>
                                <h2>{doc.title}</h2>
                                <p>{doc.description}</p>
                                <p className={styles["last-edited"]}>上次編輯：{doc?.lastEdited}</p>
                            </a>
                        ))
                    )}
                </div>

                <BackToHome />
            </div>
        </>
    );
}

export default Index;