import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                duoGreen: "#58cc02",
                duoBlue: "#1cb0f6",
                duoRed: "#ff4b4b",
            },
            fontFamily: {
                sans: ["din-round", "system-ui", "-apple-system", "sans-serif"],
            },
        },
    },
    plugins: [],
};
export default config;
