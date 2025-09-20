import styles from "./NewsCard.module.css";

function NewsCard({ title, content, category, categoryZH, date }: { [key: string]: string }) {
    const formattedDate = date.replace(/-/g, "/").split(" ")[0];

    return (
        <div className={styles.card}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.info}>
                <span className={`${styles.category} ${styles[category]}`}>
                    {categoryZH}
                </span>
                <span className={styles.date}>{formattedDate}</span>
            </div>
            <p>{content}</p>
        </div>
    );
}

export default NewsCard;