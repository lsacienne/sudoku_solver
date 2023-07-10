import { defineConfig } from '@vue/cli-service'
export default defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/sudoku_solver/" : "/",
})
