import { useRoutes, useLocation } from "react-router";

import routes from "./pages/routes";
import Header from "./layout/Nav";
import Footer from "./layout/Footer";

import "@assets/css/main.css";

function App() {
    const element = useRoutes(routes);
    const location = useLocation();
    const currentRoute = routes.find(
        (route: { path: string }) => route.path === location.pathname
    );

    return (
        <>
            <Header
                navBtns={
                    currentRoute?.navBtns || [
                        { id: "home", name: "首頁", path: "/" },
                        { id: "projects", name: "作品", path: "/projects" }
                    ]
                }
            />
            <main>{element}</main>
            <Footer />
        </>
    );
}

export default App;
