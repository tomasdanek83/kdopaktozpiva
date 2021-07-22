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

export type useQuizQuestionsState = {
    question?: Question
    recording?: Recording
    correctAnswer: boolean
    incorrectAnswer: boolean
    loading: boolean
    progress?: number
    answered: boolean
    recordingDetailsOpened: boolean
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

    const recordingsApi = useRecordingsApi()

    useEffect(() => {
        const loadBirdRecordings = (): void => {
            params.birds.forEach(bird => {
                const filters: SearchFilters = {
                    name: bird.scientificName,
                    type: params.type
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

            const generatedQuestions: Question[] = []

            for (let i = 0; i < params.questionCount; i++) {
                const randomBird = params.birds[Math.floor(Math.random() * params.birds.length)]

                generatedQuestions.push({
                    index: i + 1,
                    bird: randomBird,
                    birdRecordings: birdRecordings.find(br => br.bird === randomBird) as BirdRecordings
                })
            }

            setQuestions(generatedQuestions)
            console.log('Questions', generatedQuestions)
            const firstQuestion = generatedQuestions[0]
            setCurrentQuestion(firstQuestion)
            setRandomRecording(firstQuestion)
            setLoading(false)
        }
    }, [birdRecordings])

    const setRandomRecording = (question: Question): void => {
        const remainingRecordings = question.birdRecordings.recordings.filter(r => !recordingsHistory.includes(r))
        const randomRecording = remainingRecordings[Math.floor(Math.random() * remainingRecordings.length)]

        console.log('setRandomRecording', randomRecording)

        setRecording(randomRecording)
        setRecordingsHistory(prevState => [...prevState, randomRecording])
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
        setRandomRecording(currentQuestion as Question)
    }

    const handleNextQuestion = (): void => {
        const nextQuestion = questions.find(q => q.index === currentQuestion?.index as number + 1) as Question

        setCorrectAnswer(false)
        setIncorrectAnswer(false)
        setCurrentQuestion(nextQuestion)
        setRandomRecording(nextQuestion)
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
        handleAnswerClick,
        handleNextRecording,
        handleNextQuestion,
        handleFinished,
        toggleRecordingDetails
    }
}
