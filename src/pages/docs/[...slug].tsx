import styles from "./DocPage.module.css";
import React, { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import fm from "front-matter";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import "@assets/docs/atom-one-dark.min.css";

import { SEO, DocsCodeBlock, DocsBreadcrumbs, BackToTop, BackToHome } from "@comp";
import NotFound from "@pages/404";

interface DocMeta {
    title: string;
    description?: string;
    lastEdited: string;
}

const navBtns = [
    { id: "home", name: "首頁", path: "/" },
    { id: "projects", name: "作品", path: "/projects" },
    { id: "about", name: "關於", path: "/#About" },
    { id: "docs", name: "文檔", path: "/docs" },
]

function DocPage() {
    const match = useMatch("/docs/*");
    let slug = match?.params["*"] || "";
    slug = slug.replace(/\/$/, "");

    const [content, setContent] = useState<string>("");
    const [meta, setMeta] = useState<DocMeta>({} as DocMeta);
    const [notFound, setNotFound] = useState<boolean>(false);
    useEffect(() => {
        const fetchDoc = async () => {
            let res = await fetch(`/docs/${slug}.md`);
            let text = await res.text();
            if (text.startsWith("<!DOCTYPE html")) {
                res = await fetch(`/docs/${slug}/index.md`);
                text = await res.text();
                if (text.startsWith("<!DOCTYPE html")) {
                    setNotFound(true);
                    return;
                }
            }
            const { attributes, body } = fm(text);
            setMeta(attributes as DocMeta);
            setContent(body);
        };
        fetchDoc();
    }, [slug]);

    if (notFound) {
        return <NotFound />;
    }

    const lastEdited = new Date(meta.lastEdited).toLocaleDateString();

    return (
        <div className={styles.container}>
            <SEO title={`${meta.title} - 文檔`} desc={meta.description} />
            <DocsBreadcrumbs />
            <div className={styles.md}>
                <p>
                    上次編輯：
                    {!lastEdited || !(lastEdited === "Invalid Date")
                        ? lastEdited
                        : new Date().toDateString()}
                </p>
                <ReactMarkdown
                    children={content}
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight, rehypeSlug]}
                    components={{
                        pre({ children, ...props }) {
                            let language = "";
                            React.Children.forEach(children, (child) => {
                                if (
                                    React.isValidElement(child) &&
                                    child.type === "code"
                                ) {
                                    const childProps = child.props as {
                                        className?: string;
                                    };
                                    const className =
                                        childProps.className || "";
                                    const match =
                                        className.match(/language-(\w+)/);
                                    if (match) {
                                        language = match[1];
                                    }
                                }
                            });

                            return (
                                <DocsCodeBlock
                                    language={language}
                                    props={props}
                                >
                                    {children}
                                </DocsCodeBlock>
                            );
                        },
                        a({ children, ...props }) {
                            return (
                                <a {...props} className={`link ${styles.link}`}>
                                    {children}
                                </a>
                            );
                        },
                    }}
                />
            </div>
            <BackToHome />
            <BackToTop />
        </div>
    );
}

DocPage.navBtns = navBtns;
export default DocPage;
