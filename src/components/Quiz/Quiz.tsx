import { Button, createStyles, makeStyles, Theme, Typography, CircularProgress } from '@material-ui/core'
import React, { ReactElement, useEffect, useState } from 'react'
import { Recording } from '../../api/Recording.model'
import { SearchFilters } from '../../api/SearchFilters.model'
import { useRecordingsApi } from '../../hooks/useRecordingsApi'
import { BirdRecordings } from '../../model/BirdRecordings.model'
import { Question } from '../../model/Question.model'
import { QuizParams } from '../../model/QuizParams.model'
import { QuizSummary } from '../../model/QuizSummary.model'
import RecordingPlayer from '../RecordingPlayer/RecordingPlayer'
import { Bird } from '../../model/Bird.model'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        player: {
            marginTop: '1rem'
        },
        answers: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1rem'
        },
        answer: {
            margin: theme.spacing(1)
        },
        correctAnswer: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1rem',
            color: 'green'
        },
        incorrectAnswer: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1rem',
            color: 'red'
        },
        nextRecording: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1rem'
        },
        nextQuestion: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1rem'
        },
        loading: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        loadingText: {
            marginLeft: '1rem'
        }
    })
)

export type QuizProps = {
    params: QuizParams
    onFinished: (summary: QuizSummary) => void
}

export default function Quiz ({ params }: QuizProps): ReactElement {
    const [recording, setRecording] = useState<Recording>()
    const [birdRecordings, setBirdRecordings] = useState<BirdRecordings[]>([])
    const [questions, setQuestions] = useState<Question[]>([])
    const [currentQuestion, setCurrentQuestion] = useState<Question>()
    const [correctAnswer, setCorrectAnswer] = useState<boolean>(false)
    const [incorrectAnswer, setIncorrectAnswer] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [progress, setProgress] = useState<number>()

    const classes = useStyles()

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
            const firstQuestion = generatedQuestions[0]
            setCurrentQuestion(firstQuestion)
            setRandomRecording(firstQuestion)
            setLoading(false)
        }
    }, [birdRecordings])

    const setRandomRecording = (question: Question): void => {
        const randomRecording = question.birdRecordings.recordings[Math.floor(Math.random() * question.birdRecordings.recordings.length)]
        setRecording(randomRecording)
    }

    const handleAnswerClick = (bird: Bird): void => {
        if (bird === currentQuestion?.bird) {
            setCorrectAnswer(true)
            setIncorrectAnswer(false)
        } else {
            setCorrectAnswer(false)
            setIncorrectAnswer(true)
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

    if (loading) {
        return (<div className={classes.loading}>
            <CircularProgress variant="determinate" value={progress} /><span className={classes.loadingText}>Připravuji kvíz...</span>
        </div>)
    }

    return (<>
        <Typography variant="h5">
            Otázka {currentQuestion?.index}/{params.questionCount}
        </Typography>

        <div className={classes.player}>
            <RecordingPlayer recording={recording}></RecordingPlayer>
        </div>

        <div className={classes.answers}>
            {params.birds.map((bird, index) => {
                return <Button
                    onClick={() => { handleAnswerClick(bird) }}
                    className={classes.answer}
                    variant="outlined"
                    key={index}>{bird.czechName}
                </Button>
            })}
        </div>

        {correctAnswer && <div className={classes.correctAnswer}>Správná odpověď</div>}
        {incorrectAnswer && <div className={classes.incorrectAnswer}>Nesprávná odpověď</div>}

        {incorrectAnswer && <div className={classes.nextRecording}><Button onClick={handleNextRecording}>Zkusit jinou nahrávku</Button></div>}

        <div className={classes.nextQuestion}>
            <Button
                onClick={handleNextQuestion}
                variant="contained"
                color="primary">Další otázka</Button>
        </div>
    </>)
}
