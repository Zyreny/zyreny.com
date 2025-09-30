import { Outlet, useLocation } from "react-router-dom";

import { pageNavBtns } from "./pages/routes";
import Nav from "./layout/Nav";
import Footer from "./layout/Footer";

import "./index.css";

function App() {
    const location = useLocation();

    const currentPath =
        location.pathname.length > 1 && location.pathname.endsWith("/")
            ? location.pathname.slice(0, -1)
            : location.pathname;

    return (
        <>
            <Nav
                navBtns={
                    pageNavBtns[currentPath] ||
                    (() => {
                        for (const [routePath, navBtns] of Object.entries(
                            pageNavBtns
                        )) {
                            const baseRoute = routePath.replace("/*", "");
                            if (
                                routePath.includes("*") &&
                                currentPath.startsWith(baseRoute)
                            ) {
                                return navBtns;
                            }
                        }
                        return null;
                    })() || [
                        { id: "home", name: "首頁", path: "/" },
                        { id: "projects", name: "作品", path: "/projects" },
                        { id: "about", name: "關於", path: "/#About" },
                    ]
                }
            />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default App;
