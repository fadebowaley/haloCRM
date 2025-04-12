import type { Config } from "tailwindcss";
import sharedConfig from "tailwind-config";

const config: Pick<Config, "prefix" | "presets" | "content"> = {
  content: [
    "./src/**/*.tsx",
    "./node_modules/rizzui/dist/*.{js,ts,jsx,tsx}", // must use this line to compile and generate our RizzUI components style
  ],
  presets: [sharedConfig],
};

export default config;
