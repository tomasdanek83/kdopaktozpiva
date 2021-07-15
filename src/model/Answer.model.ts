import { Recording } from '../api/Recording.model'
import { Bird } from './Bird.model'

export type Answer = {
    index: number
    bird: Bird
    pickedBird: Bird
    recording: Recording
}
