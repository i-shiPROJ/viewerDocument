export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://test-app-csm.up.railway.app',
  ENDPOINTS: {
    DOCS: import.meta.env.VITE_API_DOCS_ENDPOINT || '/user/docs'
  }
} as const

//билдер урла
export const buildApiUrl = (endpoint: string, params?: Record<string, string>): string => {
  const url = new URL(endpoint, API_CONFIG.BASE_URL)
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })
  }

  return url.toString()
}

//методы под нужный урл
export const documentsApi = {
  getDocuments: (search?: string) => {
    const params = search ? { search } : undefined
    return buildApiUrl(API_CONFIG.ENDPOINTS.DOCS, params)
  }
}
