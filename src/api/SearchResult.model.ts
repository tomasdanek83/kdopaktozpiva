import { Recording } from './Recording.model'

/**
 * https://www.xeno-canto.org/explore/api
 */
export type SearchResult = {
  numRecordings: number
  numSpecies: number
  page: number
  numPages: number
  recordings: Recording[]
}
