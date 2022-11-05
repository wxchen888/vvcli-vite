import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { PROXY_HOST } = loadEnv(mode, process.cwd(), "");
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
        resolvers: [NaiveUiResolver()]
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
        "/flag/xxx/xx": {
          target: `http://${PROXY_HOST}`,
          rewrite: (path) => path.replace("/flag", "")
        }
      }
    }
  };
});
