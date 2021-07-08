import axios from 'axios'
import { SearchFilters } from '../api/SearchFilters.model'
import { SearchResult } from '../api/SearchResult.model'

export type XenoCantoApi = {
  search: (filters: SearchFilters, page?: number) => Promise<SearchResult>
}

const getQueryParams = (filters: SearchFilters, page?: number): URLSearchParams => {
  const params = new URLSearchParams()

  // const queryParams: string[] = []

  if (filters.name != null) {
    params.append('name', filters.name)
  }

  if (filters.type != null) {
    params.append('type', filters.type)
  }

  // if (filters.genus != null) {
  //   queryParams.push(`gen:${filters.genus}`)
  // }

  // if (filters.subSpecies != null) {
  //   queryParams.push(`ssp:${filters.subSpecies}`)
  // }

  // if (filters.country != null) {
  //   queryParams.push(`cnt:${filters.country}`)
  // }

  // if (filters.type != null) {
  //   queryParams.push(`type:${filters.type}`)
  // }

  // if (filters.quality != null) {
  //   queryParams.push(`q:${filters.quality}`)
  // }

  // if (filters.qualityGreaterThan != null) {
  //   queryParams.push(`q_gt:${filters.qualityGreaterThan}`)
  // }

  // if (queryParams.length === 0) {
  //   throw Error('At least one filter must be specified')
  // }

  // params.append('query', queryParams.join(' '))

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

export const useRecordingsApi = (): XenoCantoApi => {
  const apiUrl = 'http://kdopaktozpiva.dankovi.org/api/getrecordings.php'

  return {
    search: async (filters: SearchFilters, page?: number): Promise<SearchResult> => {
      return await search(apiUrl, filters, page)
    }
  }
}
