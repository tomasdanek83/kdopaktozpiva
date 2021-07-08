import { SoundType } from '../api/SoundType.model'
import { Bird } from './Bird.model'

export type QuizParams = {
    birds: Bird[]
    questionCount: number
    type: SoundType
}
