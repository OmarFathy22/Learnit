import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const minfest = {
  display: "standalone",
  orientation: "portrait",
  background_color: "#ffffff",
  theme_color: "#ffffff",

  scope: "/",
  start_url: "/",
  name: "TASKATI",
  short_name: "TASKATI",
  icons: [
    {
      src: "/icon-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "/icon-256x256.png",
      sizes: "256x256",
      type: "image/png",
    },
    {
      src: "/icon-384x384.png",
      sizes: "384x384",
      type: "image/png",
    },
    {
      src: "/icon-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
  ],
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(minfest)],
});
