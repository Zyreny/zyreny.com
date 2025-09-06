import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./pages/routes";

export const createRoot = ViteReactSSG(
    { routes }
);