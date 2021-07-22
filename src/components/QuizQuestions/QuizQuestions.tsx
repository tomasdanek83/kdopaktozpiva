import { Button, createStyles, makeStyles, Theme, Typography, CircularProgress, Drawer } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { QuizParams } from '../../model/QuizParams.model'
import { QuizSummary } from '../../model/QuizSummary.model'
import RecordingDetails from '../RecordingDetails/RecordingDetails'
import RecordingPlayer from '../RecordingPlayer/RecordingPlayer'
import useQuizQuestions from './useQuizQuestions'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        player: {
            marginTop: '1rem'
        },
        answers: {
            textAlign: 'center',
            marginTop: '1rem'
        },
        answer: {
            margin: theme.spacing(1),
            whiteSpace: 'nowrap'
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

export type QuizQuestionsProps = {
    params: QuizParams
    onFinished: (summary: QuizSummary) => void
}

export default function QuizQuestions ({ params, onFinished }: QuizQuestionsProps): ReactElement {
    const {
        question,
        recording,
        correctAnswer,
        incorrectAnswer,
        loading,
        progress,
        answered,
        recordingDetailsOpened,
        handleAnswerClick,
        handleNextRecording,
        handleNextQuestion,
        handleFinished,
        toggleRecordingDetails
    } = useQuizQuestions(params, onFinished)

    const classes = useStyles()

    if (loading) {
        return (<div className={classes.loading}>
            <CircularProgress variant="indeterminate" value={progress} /><span className={classes.loadingText}>Připravuji kvíz...</span>
        </div>)
    }

    const isLastQuestion = question?.index === params.questionCount
    const isEducation = params.mode === 'education'

    return (<>
        <Typography variant="h5">
            Otázka {question?.index}/{params.questionCount}
        </Typography>

        <div className={classes.player}>
            <RecordingPlayer recording={recording} autoPlay={true}></RecordingPlayer>
        </div>

        <div className={classes.player}>
            <Button onClick={toggleRecordingDetails(true)}>Informace o nahrávce</Button>
            <Drawer anchor="right" open={recordingDetailsOpened} onClose={toggleRecordingDetails(false)}>
                <RecordingDetails recording={recording}></RecordingDetails>
            </Drawer>
        </div>

        <div className={classes.answers}>
            {params.birds.map((bird, index) => {
                return <Button
                    onClick={() => { handleAnswerClick(bird) }}
                    className={classes.answer}
                    variant="outlined"
                    disabled={!isEducation && answered}
                    key={index}>{bird.czechName}
                </Button>
            })}
        </div>

        {correctAnswer && <div className={classes.correctAnswer}>Správná odpověď</div>}
        {incorrectAnswer && <div className={classes.incorrectAnswer}>Nesprávná odpověď</div>}

        {isEducation && incorrectAnswer && <div className={classes.nextRecording}><Button onClick={handleNextRecording}>Zkusit jinou nahrávku</Button></div>}

        <div className={classes.nextQuestion}>
            {!isLastQuestion && <Button
                onClick={handleNextQuestion}
                disabled={!answered}
                variant="contained"
                color="primary">Další otázka</Button>}

            {isLastQuestion && <Button
                onClick={handleFinished}
                disabled={!answered}
                variant="contained"
                color="primary">Zobrazit výsledky</Button>}
        </div>
    </>)
}
