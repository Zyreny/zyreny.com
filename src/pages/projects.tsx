import SEO from "../components/common/SEO";
import { BackToHome, IndexBlock, ProjectsList } from "@comp";

const navBtns = [
    { id: "home", name: "首頁", path: "/" }, 
    { id: "about", name: "關於", path: "/#About" },
];

function Projects() {
    return (
        <>
            <SEO
                title="作品集 - Zyreny"
                desc="這裡收錄了我的所有作品，展示各種有趣的作品與練習成果。"
                url="https://zyreny.com/projects"
            />

            <IndexBlock title="作品集" desc="這裡有我所有的作品">
                <ProjectsList endpoint="" />
                <BackToHome />
            </IndexBlock>
        </>
    );
}

Projects.navBtns = navBtns;
export default Projects;