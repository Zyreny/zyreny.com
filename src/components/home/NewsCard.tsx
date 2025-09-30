import styles from "./NewsCard.module.css";

function NewsCard({ title, content, category, categoryZH, date }: { [key: string]: string }) {
    const formattedDate = date.replace(/-/g, "/").split(" ")[0];

    const renderContent = () => {
        const parts = content.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                const text = part.replace(/\*\*/g, '');
                return <i key={index}>{text}</i>;
            }
            return part;
        });
    }

    return (
        <div className={styles.card}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.info}>
                <span className={`${styles.category} ${styles[category]}`}>
                    {categoryZH}
                </span>
                <span className={styles.date}>{formattedDate}</span>
            </div>
            <p>{renderContent()}</p>
        </div>
    );
}

export default NewsCard;