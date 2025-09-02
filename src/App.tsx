import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Nav from "./layout/Nav";
import Footer from "./layout/Footer";
import { getNavBtns, type NavBtn } from "@pages/routes";

import "@assets/css/main.css";

function App() {
    const location = useLocation();
    const [navBtns, setNavBtns] = useState<NavBtn[]>([
        { id: "home", name: "首頁", path: "/" },
        { id: "projects", name: "作品", path: "/projects" },
    ]);

    useEffect(() => {
        setNavBtns(getNavBtns(location.pathname));
    }, [location.pathname]);

    return (
        <>
            <Nav navBtns={navBtns} />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default App;
