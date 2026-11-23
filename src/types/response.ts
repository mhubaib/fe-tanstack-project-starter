export type ApiStatus = 'success' | 'error'

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  total_pages: number
}

export interface ApiResponse<T = unknown> {
  status: ApiStatus
  code: number
  message: string
  data: T | null
  pagination?: PaginationMeta | null
  errors?: (string | { field: string; error: string })[] | null
}

export interface PaginationApiResponse<T = unknown> {
  status: ApiStatus
  code: number
  message: string
  data: T[]
  pagination?: PaginationMeta
  errors?: (string | { field: string; error: string })[] | null
}
