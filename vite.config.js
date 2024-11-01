import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Asegúrate de que la carpeta sea 'dist'
    sourcemap: true, // Generar mapas de origen
  },
});
