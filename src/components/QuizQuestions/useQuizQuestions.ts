import { useEffect, useState } from 'react'
import { Recording } from '../../api/Recording.model'
import { SearchFilters } from '../../api/SearchFilters.model'
import { useRecordingsApi } from '../../hooks/useRecordingsApi'
import { Answer } from '../../model/Answer.model'
import { Bird } from '../../model/Bird.model'
import { BirdRecordings } from '../../model/BirdRecordings.model'
import { Question } from '../../model/Question.model'
import { QuizParams } from '../../model/QuizParams.model'
import { QuizSummary } from '../../model/QuizSummary.model'
import { useSnackbar } from 'notistack-v5'

export type useQuizQuestionsState = {
    question?: Question
    recording?: Recording
    correctAnswer: boolean
    incorrectAnswer: boolean
    loading: boolean
    progress?: number
    answered: boolean
    nextRecordingEnabled: boolean
    recordingDetailsOpened: boolean
    insufficientBirdRecordings: BirdRecordings[]
    handleAnswerClick: (bird: Bird) => void
    handleNextRecording: () => void
    handleNextQuestion: () => void
    handleFinished: () => void
    toggleRecordingDetails: (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent
    ) => void
}

export default function useQuizQuestions (
    params: QuizParams,
    onFinished: (summary: QuizSummary) => void): useQuizQuestionsState {
    const [recording, setRecording] = useState<Recording>()
    const [birdRecordings, setBirdRecordings] = useState<BirdRecordings[]>([])
    const [questions, setQuestions] = useState<Question[]>([])
    const [currentQuestion, setCurrentQuestion] = useState<Question>()
    const [correctAnswer, setCorrectAnswer] = useState<boolean>(false)
    const [incorrectAnswer, setIncorrectAnswer] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [progress, setProgress] = useState<number>()
    const [answers, setAnswers] = useState<Answer[]>([])
    const [recordingsHistory, setRecordingsHistory] = useState<Recording[]>([])
    const [recordingDetailsOpened, setRecordingDetailsOpened] = useState(false)
    const [insufficientBirdRecordings, setInsufficientBirdRecordings] = useState<BirdRecordings[]>([])
    const [nextRecordingEnabled, setNextRecordingEnabled] = useState<boolean>(true)

    const recordingsApi = useRecordingsApi()
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        const loadBirdRecordings = (): void => {
            params.birds.forEach(bird => {
                const filters: SearchFilters = {
                    name: bird.xenoCantoName,
                    type: params.type,
                    quality: params.quality
                }

                recordingsApi.search(filters, 1).then(result => {
                    console.log('XentoCantoApi search result', result)

                    setBirdRecordings(prevState => [...prevState, {
                        bird: bird,
                        recordings: result.recordings,
                        playedRecordings: []
                    }])
                }).catch(error => {
                    console.error('XenoCantoApi search failed', error)
                    enqueueSnackbar('Failed to get recordings', { variant: 'error' })
                })
            })
        }

        if (params.birds.length > 0 && birdRecordings.length === 0) {
            loadBirdRecordings()
        }
    }, [params.birds])

    useEffect(() => {
        setProgress((birdRecordings.length / params.birds.length) * 100)

        if (birdRecordings.length === params.birds.length) {
            console.log('Recordings loaded for all birds', birdRecordings)

            const generatedQuestions = generateQuestions()
            console.log('Questions', generatedQuestions)

            const insufficientRecordings = getInsufficientRecordings(generatedQuestions)

            if (insufficientRecordings.length > 0) {
                setInsufficientBirdRecordings(insufficientRecordings)
                setLoading(false)
                return
            }

            setQuestions(generatedQuestions)
            const firstQuestion = generatedQuestions[0]
            setCurrentQuestion(firstQuestion)
            setRandomRecording(firstQuestion, generatedQuestions)
            setLoading(false)
        }
    }, [birdRecordings])

    // Generate given count of questions, birds are picked randomly
    // TODO: Improve random generator so that there is reasonable distribution of birds
    const generateQuestions = (): Question[] => {
        const generatedQuestions: Question[] = []

        for (let i = 0; i < params.questionCount; i++) {
            const randomBird = params.birds[Math.floor(Math.random() * params.birds.length)]

            generatedQuestions.push({
                index: i + 1,
                bird: randomBird,
                birdRecordings: birdRecordings.find(br => br.bird === randomBird) as BirdRecordings
            })
        }

        return generatedQuestions
    }

    // Get birds for which there are not enough recordings for all generated questions
    const getInsufficientRecordings = (generatedQuestions: Question[]): BirdRecordings[] => {
        const insufficientRecordings: BirdRecordings[] = []

        birdRecordings.forEach(br => {
            const recordingsNeeded = generatedQuestions.filter(question => question.bird === br.bird).length

            if (recordingsNeeded > br.recordings.length) {
                insufficientRecordings.push(br)
            }
        })

        return insufficientRecordings
    }

    // Randomly pick recording from remaining recordings for given bird
    const setRandomRecording = (question: Question, allQuestions: Question[]): void => {
        const remainingRecordings = question.birdRecordings.recordings.filter(r => !recordingsHistory.includes(r))
        const randomRecording = remainingRecordings[Math.floor(Math.random() * remainingRecordings.length)]

        console.log('setRandomRecording', randomRecording)

        setRecording(randomRecording)
        setRecordingsHistory(prevState => [...prevState, randomRecording])

        // Count how many recordings for this bird we need to finish the quiz
        const remainingBirdQuestions = allQuestions.filter(q => q.bird === question.bird && q.index > question.index)

        // If there are not enough remaining recordings, disable next recording for remaining questions
        if ((remainingBirdQuestions.length + 1) > (remainingRecordings.length - 1)) {
            console.log(`Not enough recordings for ${question.bird.xenoCantoName} to show next recording, disabling the button`, remainingBirdQuestions.length, remainingRecordings.length)
            setNextRecordingEnabled(false)
        }
    }

    const handleAnswerClick = (bird: Bird): void => {
        const question = currentQuestion as Question

        const correct = bird === question.bird

        setCorrectAnswer(correct)
        setIncorrectAnswer(!correct)

        const hasAnswer = answers.some(a => a.index === question.index)
        if (!hasAnswer) {
            const answer: Answer = {
                index: question.index,
                bird: question.bird,
                pickedBird: bird,
                recording: recording as Recording
            }

            setAnswers(prevAnswers => [...prevAnswers, answer])
        }
    }

    const handleNextRecording = (): void => {
        setCorrectAnswer(false)
        setIncorrectAnswer(false)
        setRandomRecording(currentQuestion as Question, questions)
    }

    const handleNextQuestion = (): void => {
        const nextQuestion = questions.find(q => q.index === currentQuestion?.index as number + 1) as Question

        setCorrectAnswer(false)
        setIncorrectAnswer(false)
        setCurrentQuestion(nextQuestion)
        setRandomRecording(nextQuestion, questions)
    }

    const handleFinished = (): void => {
        const summary: QuizSummary = {
            answers: answers
        }

        onFinished(summary)
    }

    const toggleRecordingDetails = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return
        }

        setRecordingDetailsOpened(open)
    }

    return {
        question: currentQuestion,
        recording,
        correctAnswer,
        incorrectAnswer,
        loading,
        progress,
        answered: answers.some(a => a.index === currentQuestion?.index),
        recordingDetailsOpened,
        insufficientBirdRecordings,
        nextRecordingEnabled,
        handleAnswerClick,
        handleNextRecording,
        handleNextQuestion,
        handleFinished,
        toggleRecordingDetails
    }
}
