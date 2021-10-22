import { RecordingQualityLevel } from '../model/RecordingQualityLevel.model'
import { SoundType } from './SoundType.model'

export type SearchFilters = {
    name?: string
    genus?: string
    subSpecies?: string
    country?: string
    also?: string
    type?: SoundType
    quality?: RecordingQualityLevel
}
