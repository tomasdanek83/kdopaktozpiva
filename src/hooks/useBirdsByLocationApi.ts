import axios from 'axios'
import { BirdQuantity } from '../api/BirdQuantity.model'
import { BirdsByLocationFilters } from '../api/BirdsByLocationFilters.model'

export type BirdsByLocationApi = {
  getBirdsByLocation: (filters: BirdsByLocationFilters) => Promise<BirdQuantity[]>
}

const getQueryParams = (filters: BirdsByLocationFilters): URLSearchParams => {
  const params = new URLSearchParams()

  params.append('lat', filters.lat.toString())
  params.append('lng', filters.lng.toString())
  params.append('radius', filters.radius.toString())
  params.append('timerange', filters.timerange.toString())

  if (filters.monthFrom > 0) {
    params.append('monthfrom', filters.monthFrom.toString())
  }

  if (filters.monthTo > 0) {
    params.append('monthto', filters.monthTo.toString())
  }

  return params
}

const getBirdsByLocation = async (apiUrl: string, filters: BirdsByLocationFilters): Promise<BirdQuantity[]> => {
  return await new Promise<BirdQuantity[]>((resolve, reject) => {
    axios.get<BirdQuantity[]>(apiUrl, { params: getQueryParams(filters) }).then((result) => {
      resolve(result.data)
    }).catch((error) => {
      reject(error)
    })
  })
}

export const useBirdsByLocationApi = (): BirdsByLocationApi => {
  const apiUrl = 'https://www.kdopaktozpiva.cz/api/getbirdsbylocation.php'

  return {
    getBirdsByLocation: async (filters: BirdsByLocationFilters): Promise<BirdQuantity[]> => {
      return await getBirdsByLocation(apiUrl, filters)
    }
  }
}
