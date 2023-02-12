import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import vitePluginImp from "vite-plugin-imp";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";
export default defineConfig({
  base: "/",
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@global": path.resolve(__dirname, "src/global/"),
      "@hooks": path.resolve(__dirname, "src/hooks/"),
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@router": path.resolve(__dirname, "src/router/"),
      "@service": path.resolve(__dirname, "src/service/"),
      "@store": path.resolve(__dirname, "src/store/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
    },
  },
  plugins: [
    react(),
    visualizer({
      open: true, //注意这里要设置为true，否则无效
      gzipSize: true,
      brotliSize: true,
    }),
    // vitePluginImp({
    //   libList: [
    //     {
    //       libName: "antd",
    //       style: (name) => `antd/es/${name}/style`,
    //     },
    //   ],
    // }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },

  build: {
    minify: false,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("antd")) {
            return "antd";
          }
        },
        // manualChunks: {
        //   read: ["./src/pages/read"],
        //   aboutMe: ["./src/pages/aboutMe"],
        //   edit: ["./src/pages/edit"],
        //   setting: [
        //     "./src/pages/setting/settingPermissions",
        //     "./src/pages/setting/settingRoles",
        //     "./src/pages/setting/settingUsers",
        //   ],
        // },
      },
    },
  },
});
