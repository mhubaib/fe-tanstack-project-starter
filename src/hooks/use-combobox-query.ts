import { useEffect, useState } from 'react'
import type { UseQueryResult } from '@tanstack/react-query'
import type { PaginationApiResponse } from '@/types'
import { useDebounce } from '@/hooks/use-debounce'

interface UseComboboxQueryProps<T, TParams> {
  queryHook: (
    params: TParams,
  ) => UseQueryResult<PaginationApiResponse<T>, Error>
  limit?: number
  extraParams?: Partial<TParams>
  searchKey?: string
}

export function useComboboxQuery<T extends { id: string }, TParams>({
  queryHook,
  limit = 20,
  extraParams = {},
  searchKey = 'search',
}: UseComboboxQueryProps<T, TParams>) {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [allItems, setAllItems] = useState<T[]>([])
  const [hasMore, setHasMore] = useState(true)

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const query = queryHook({
    page: currentPage,
    limit,
    [searchKey]: debouncedSearchTerm || undefined,
    ...extraParams,
  } as unknown as TParams)

  const { data, isLoading, isError, refetch } = query

  const extraParamsSerialized = JSON.stringify(extraParams)

  useEffect(() => {
    const debounceManager = () => {
      setCurrentPage(1)
      setAllItems([])
      setHasMore(true)
    }
    debounceManager()
  }, [debouncedSearchTerm, extraParamsSerialized])

  useEffect(() => {
    const paginationManager = () => {
      if (data?.data) {
        if (currentPage === 1) {
          setAllItems(data.data)
        } else {
          setAllItems((prev) => {
            const newData = data.data.filter(
              (newItem: T) =>
                !prev.some((existingItem) => existingItem.id === newItem.id),
            )
            return [...prev, ...newData]
          })
        }

        const pagination = data.pagination
        if (pagination) {
          setHasMore(currentPage < pagination.total_pages)
        }
      }
    }
    paginationManager()
  }, [data, currentPage])

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  return {
    searchTerm,
    setSearchTerm,
    allItems,
    isLoading,
    isError,
    hasMore,
    refetch,
    loadMore,
  }
}
