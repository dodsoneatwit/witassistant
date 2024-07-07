/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT: string,
  readonly VITE_FAKE_API: string?
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}