import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	server: {
		proxy: {
			"/uploads": {
				target: "http://localhost:4000",
				changeOrigin: true,
			},
			"/api": {
				target: "http://localhost:4000",
				changeOrigin: true,
			},
		},
	},
	plugins: [tailwindcss(), react()],
});
