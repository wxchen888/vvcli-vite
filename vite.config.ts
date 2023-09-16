import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import {
  NaiveUiResolver,
  ElementPlusResolver
} from "unplugin-vue-components/resolvers";
import { resolve } from "path";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { APP_PROXY_HOST } = loadEnv(mode, process.cwd(), "");
  console.log("APP_PROXY_HOST", APP_PROXY_HOST);

  return {
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        imports: [
          "vue",
          "vue-router",
          "pinia",
          {
            axios: [["default", "axios"]],
            "@/api/request": [["default", "request"]],
            "@vueuse/core": [
              "useMouse", // import { useMouse } from '@vueuse/core',
              "useCounter", // don not import all core function because it is huge
              ["useFetch", "useMyFetch"] // import { useFetch as useMyFetch } from '@vueuse/core',
            ]
          }
        ],
        dts: "src/auto-import.d.ts",
        eslintrc: {
          enabled: true
        }
      }),
      Components({
        dirs: ["src/components"],
        dts: "src/components.d.ts",
        resolvers: [NaiveUiResolver(), ElementPlusResolver()]
      })
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src")
      }
    },
    server: {
      host: true,
      proxy: {
        "/proxyapi": {
          target: `http://${APP_PROXY_HOST}`,
          rewrite: (path) => path.replace("/proxyapi", "")
        }
      }
    }
  };
});
