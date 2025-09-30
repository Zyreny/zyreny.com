import styles from "./DocsBreadcrumbs.module.css";
import fm from "front-matter";
import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function DocsBreadcrumbs() {
    const location = useLocation();
    const [items, setItems] = useState<{ name: string; path: string }[]>([]);

    useEffect(() => {
        const pathnames = location.pathname.split("/").filter((x: string) => x);
        const newItems: { name: string; path: string }[] = [];

        const loadBreadcrumbs = async () => {
            for (const segment of pathnames) {
                if (segment === "docs") {
                    newItems.push({ name: "文檔中心", path: "/docs" });
                } else {
                    let res = await fetch(
                        `/${pathnames
                            .slice(0, pathnames.indexOf(segment) + 1)
                            .join("/")}.md`
                    );
                    let text = await res.text();
                    if (text.startsWith("<!DOCTYPE html")) {
                        res = await fetch(
                            `/${pathnames
                                .slice(0, pathnames.indexOf(segment) + 1)
                                .join("/")}/index.md`
                        );
                        text = await res.text();
                    }
                    const { attributes } = fm(text);
                    newItems.push({
                        name:
                            (attributes as { title: string }).title ||
                            segment.toUpperCase(),
                        path: `/${pathnames
                            .slice(0, pathnames.indexOf(segment) + 1)
                            .join("/")}`,
                    });
                }
            }
            setItems(newItems);
        };

        loadBreadcrumbs();
    }, [location.pathname]); // 只依賴 location.pathname，不依賴 pathnames

    return (
        <div className={styles.breadcrumbs}>
            {items.map((item, i) => {
                if (i === 0) {
                    return (
                        <span key={i}>
                            <a href={item.path} className="link">{item.name}</a>
                        </span>
                    );
                }

                return (
                    <Fragment key={i}>
                        <span>&gt;</span>
                        <span>
                            <a href={item.path} className="link">{item.name}</a>
                        </span>
                    </Fragment>
                );
            })}
        </div>
    );
}

export default DocsBreadcrumbs;
