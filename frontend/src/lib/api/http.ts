/**
 * http.ts
 * Minimal HTTP client wrapper with optional OSCAR/OpenOSP compatibility.
 * Provides a base URL setter, JSON helpers, and simple error handling.
 */

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

/**
 * HttpConfig
 * Describes runtime HTTP configuration for the adapter layer.
 */
export interface HttpConfig {
  /** Base URL for OSCAR/OpenOSP API. If undefined, services should fall back to mock data. */
  baseUrl?: string
  /** Optional CSRF header name if required by OSCAR deployment. */
  csrfHeader?: string
  /** Function to read a CSRF token (e.g., from cookies). */
  getCsrfToken?: () => string | undefined
}

/** In-memory runtime config; can be set at app bootstrap. */
let config: HttpConfig = {}

/** Sets the API configuration at runtime. */
export function setHttpConfig(partial: HttpConfig) {
  config = { ...config, ...partial }
}

/** Returns true when no base URL is configured; service modules can use this to return mocks. */
export function isMockMode(): boolean {
  return !config.baseUrl
}

/**
 * Builds a RequestInit with common headers and CSRF if needed.
 */
function buildInit(method: HttpMethod, body?: unknown): RequestInit {
  const headers: Record<string, string> = {
    Accept: 'application/json',
  }
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (config.csrfHeader && config.getCsrfToken) {
    const token = config.getCsrfToken()
    if (token) headers[config.csrfHeader] = token
  }
  return {
    method,
    headers,
    credentials: 'include', // default for cookie-based sessions in OSCAR
    body: body !== undefined ? JSON.stringify(body) : undefined,
  }
}

/**
 * fetchJson
 * Performs a fetch to the configured base URL and parses JSON.
 */
export async function fetchJson<T>(
  path: string,
  options?: { method?: HttpMethod; body?: unknown; signal?: AbortSignal },
): Promise<T> {
  if (!config.baseUrl) {
    throw new Error('No baseUrl configured for HTTP; use isMockMode() to provide mocks.')
  }
  const url = `${config.baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
  const res = await fetch(url, { ...buildInit(options?.method ?? 'GET', options?.body), signal: options?.signal })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`)
  }
  // Some legacy endpoints may return 204 No Content.
  if (res.status === 204) return undefined as unknown as T
  return (await res.json()) as T
}

/**
 * delay
 * Utility to simulate latency in mock mode for realistic UX testing.
 */
export function delay(ms = 300) {
  return new Promise((r) => setTimeout(r, ms))
}
