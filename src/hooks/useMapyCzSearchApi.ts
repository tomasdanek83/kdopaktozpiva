import axios from 'axios'
import { MapyCzSearchResult } from '../api/MapyCzSearch.model'

export type MapyCzSearchApi = {
  search: (phrase: string) => Promise<MapyCzSearchResult>
}

const getQueryParams = (phrase: string): URLSearchParams => {
  const params = new URLSearchParams()

  params.append('phrase', phrase)

  return params
}

const search = async (apiUrl: string, phrase: string): Promise<MapyCzSearchResult> => {
  return await new Promise<MapyCzSearchResult>((resolve, reject) => {
    axios.get<MapyCzSearchResult>(apiUrl, { params: getQueryParams(phrase) }).then((result) => {
      resolve(result.data)
    }).catch((error) => {
      reject(error)
    })
  })
}

export const useMapyCzSearchApi = (): MapyCzSearchApi => {
  const apiUrl = 'https://api.mapy.cz/suggest'

  return {
    search: async (phrase: string): Promise<MapyCzSearchResult> => {
      return await search(apiUrl, phrase)
    }
  }
}
