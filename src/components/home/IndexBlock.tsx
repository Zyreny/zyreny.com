import styles from '@pages/Index.module.css'

function IndexBlock({ title, desc, i = 1, className = "", id, children }: { title: string, desc?: string, i?: number, className?: string, id?: string, children?: React.ReactNode }) {
    const evenBlock = i % 2 === 0;

    return (
        <div className={`${styles.block} ${evenBlock ? styles.even : null} ${styles[className]}`} id={id}>
            <h1 className="title">{title}</h1>
            { desc ? <p className="desc">{desc}</p> : null }
            { children }
        </div>
    );
}

export default IndexBlock;