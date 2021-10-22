import { SoundType } from '../api/SoundType.model'
import { Bird } from './Bird.model'
import { QuizMode } from './QuizMode.model'
import { RecordingQualityLevel } from './RecordingQualityLevel.model'

export type QuizParams = {
    birds: Bird[]
    questionCount: number
    type: SoundType
    mode: QuizMode
    quality: RecordingQualityLevel
}
