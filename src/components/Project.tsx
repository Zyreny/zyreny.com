import styles from "./Project.module.css";
import { useEffect, useState } from "react";

const imgs = import.meta.glob("../assets/img/proj/*.webp", {
    eager: true,
    query: "?url",
    import: "default",
});

function Project({ name, title, desc }: Record<string, string>) {
    const [imgSrc, setImgSrc] = useState<string>("");

    useEffect(() => {
        for (const path in imgs) {
            if (path.includes(name)) {
                setImgSrc(imgs[path] as string);
                break;
            }
        }
    }, [name]);

    const renderDesc = () => {
        const parts = desc.split(/(<i>.*?<\/i>)/g);
        return parts.map((part, index) => {
            if (part.startsWith('<i>') && part.endsWith('</i>')) {
                const text = part.replace(/<\/?i>/g, '');
                return <i key={index}>{text}</i>;
            }
            return part;
        });
    };

    return (
            <a href={name} className={styles.proj}>
                {imgSrc && <img src={imgSrc} alt={`${title}作品縮圖`} />}
                <h2>{title}</h2>
                <p>{renderDesc()}</p>
            </a>

    );
}

export default Project;
