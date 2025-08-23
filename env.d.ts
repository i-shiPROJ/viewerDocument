/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Environment variables types
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_DOCS_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
