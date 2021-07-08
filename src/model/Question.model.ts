import { Bird } from './Bird.model'
import { BirdRecordings } from './BirdRecordings.model'

export type Question = {
    index: number
    bird: Bird
    birdRecordings: BirdRecordings
}
