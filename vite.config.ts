import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@comp": fileURLToPath(
                new URL("./src/components", import.meta.url)
            ),
            "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
            "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
            "@api": fileURLToPath(new URL("./src/api", import.meta.url)),
        },
    },
});
