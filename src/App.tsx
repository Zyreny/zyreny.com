import { Outlet, useLocation } from "react-router-dom";

import { pageNavBtns } from "./pages/routes";
import Nav from "./layout/Nav";
import Footer from "./layout/Footer";

import "@assets/css/main.css";

function App() {
    const location = useLocation();

    return (
        <>
            <Nav
                navBtns={
                    pageNavBtns[location.pathname] || [
                        { id: "home", name: "首頁", path: "/" },
                        { id: "projects", name: "作品", path: "/projects" },
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
