import { useState } from "react";
import styles from "@pages/docs/DocPage.module.css";

function DocsCodeBlock({
    language,
    children
}: {
    language: string;
    children: React.ReactNode;
    props: React.HTMLAttributes<HTMLElement>;
}) {
    const [copied, setCopied] = useState(false);
    
    const handleCopy = async () => {
        // 從 children 中提取純文字內容
        let text = '';
        
        const extractText = (node: React.ReactNode): string => {
            if (typeof node === 'string') {
                return node;
            }
            if (typeof node === 'number') {
                return String(node);
            }
            if (Array.isArray(node)) {
                return node.map(extractText).join('');
            }
            if (node && typeof node === 'object' && 'props' in node) {
                const element = node as React.ReactElement<{ children?: React.ReactNode }>;
                return extractText(element.props.children);
            }
            return '';
        };
        
        text = extractText(children);
        
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };
    
    return (
        <div className={styles.code}>
            {language && (
                <div className={styles.language}>
                    {language}
                    <span 
                        className={`${styles.copy} ${copied ? styles.copied : ''}`} 
                        onClick={handleCopy}
                        title={copied ? "已複製!" : "複製程式碼"}
                    >
                        {copied ? (
                            <svg
                                width="20px"
                                height="20px"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 -960 960 960"
                                fill="#4ade80"
                            >
                                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                            </svg>
                        ) : (
                            <svg
                                width="20px"
                                height="20px"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 -960 960 960"
                                fill="#fff"
                            >
                                <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/>
                            </svg>
                        )}
                    </span>
                </div>
            )}
            <pre>
                {children}
            </pre>
        </div>
    );
}


export default DocsCodeBlock;