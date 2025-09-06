import styles from "@pages/Food.module.css";

function Question({ index, name }: { index: string; name: string }) {
    return (
        <>
            <div id={`question${index}`} className={styles.question}>
                <h2 className={styles["q-title"]}>
                    {index}. {name}拌不拌？
                </h2>
                <label>
                    <input
                        type="radio"
                        name={`question${index}`}
                        value="1"
                    />
                    一定要拌啦！
                </label>
                <label>
                    <input
                        type="radio"
                        name={`question${index}`}
                        value="-1"
                    />
                    到底誰會拌？
                </label>
                <label>
                    <input
                        type="radio"
                        name={`question${index}`}
                        value="0"
                        defaultChecked
                    />
                    我保持中立😐
                </label>
            </div>
            <hr />
        </>
    );
}

export default Question;
