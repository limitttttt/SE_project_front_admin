import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/SE_project_front/',  // 👈 填你的仓库名（必须正确）
  plugins: [vue()],
})