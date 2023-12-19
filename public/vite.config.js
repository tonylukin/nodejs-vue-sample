import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
});

// export default {
  // root: path.resolve(__dirname, 'src'),
  // build: {
  //   outDir: './dist'
  // },
  // server: {
  //   port: 8080
  // }
// }
