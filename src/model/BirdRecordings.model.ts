import { Recording } from '../api/Recording.model'
import { Bird } from './Bird.model'

export type BirdRecordings = {
    bird: Bird
    recordings: Recording[]
}
