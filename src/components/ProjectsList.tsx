import { useEffect, useState } from "react";
import { getProjects } from "@/api";
import { Loading, Error, NoData, Project } from "@comp";
import styles from "./ProjectsList.module.css";

function ProjectsList({ endpoint }: { endpoint: string }) {
    const [projs, setProjs] = useState<{ [key: string]: string }[] | null>(
        null
    );
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getProjects(endpoint)
            .then((data) => {
                setProjs(data || []);
                setLoading(false);
            })
            .catch(() => {
                setProjs(null);
                setLoading(false);
            });
    }, [endpoint]);

    return loading ? (
        <Loading />
    ) : projs === null ? (
        <Error msg="作品載入錯誤" style={{ margin: "2rem 0 4rem" }} />
    ) : projs.length === 0 ? (
        <NoData msg="沒有作品" style={{ margin: "2rem 0 4rem" }} />
    ) : (
        <div className={styles.list}>
            {projs.map((proj) => (
                <Project
                    name={proj.name}
                    title={proj.title}
                    desc={proj.desc}
                    key={proj.name}
                />
            ))}
        </div>
    );
}

export default ProjectsList;
