import { Button, createStyles, makeStyles, Theme, Typography, CircularProgress } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { QuizParams } from '../../model/QuizParams.model'
import { QuizSummary } from '../../model/QuizSummary.model'
import RecordingPlayer from '../RecordingPlayer/RecordingPlayer'
import useQuiz from './useQuiz'

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

export default function Quiz ({ params, onFinished }: QuizProps): ReactElement {
    const {
        question,
        recording,
        correctAnswer,
        incorrectAnswer,
        loading,
        progress,
        handleAnswerClick,
        handleNextRecording,
        handleNextQuestion,
        handleFinished
    } = useQuiz(params, onFinished)

    const classes = useStyles()

    if (loading) {
        return (<div className={classes.loading}>
            <CircularProgress variant="determinate" value={progress} /><span className={classes.loadingText}>Připravuji kvíz...</span>
        </div>)
    }

    const isLastQuestion = question?.index === params.questionCount

    return (<>
        <Typography variant="h5">
            Otázka {question?.index}/{params.questionCount}
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
            {!isLastQuestion && <Button
                onClick={handleNextQuestion}
                variant="contained"
                color="primary">Další otázka</Button>}

            {isLastQuestion && <Button
                onClick={handleFinished}
                variant="contained"
                color="primary">Zobrazit výsledky</Button>}
        </div>
    </>)
}
