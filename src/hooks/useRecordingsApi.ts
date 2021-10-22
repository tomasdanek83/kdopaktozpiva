import axios from 'axios'
import { SearchFilters } from '../api/SearchFilters.model'
import { SearchResult } from '../api/SearchResult.model'

export type RecordingsApi = {
  search: (filters: SearchFilters, page?: number) => Promise<SearchResult>
}

const getQueryParams = (filters: SearchFilters, page?: number): URLSearchParams => {
  const params = new URLSearchParams()

  if (filters.name != null) {
    params.append('name', filters.name)
  }

  if (filters.type != null) {
    params.append('type', filters.type)
  }

  if (filters.quality != null) {
    params.append('quality', filters.quality)
  }

  if (page != null) {
    params.append('page', page.toString())
  }

  return params
}

const search = async (apiUrl: string, filters: SearchFilters, page?: number): Promise<SearchResult> => {
  return await new Promise<SearchResult>((resolve, reject) => {
    axios.get<SearchResult>(apiUrl, { params: getQueryParams(filters, page) }).then((result) => {
      resolve(result.data)
    }).catch((error) => {
      reject(error)
    })
  })
}

export const useRecordingsApi = (): RecordingsApi => {
  const apiUrl = 'https://www.kdopaktozpiva.cz/api/getrecordings.php'

  return {
    search: async (filters: SearchFilters, page?: number): Promise<SearchResult> => {
      return await search(apiUrl, filters, page)
    }
  }
}
