import { Button, Typography, CircularProgress, Drawer } from '@mui/material'
import React, { ReactElement } from 'react'
import { QuizParams } from '../../model/QuizParams.model'
import { QuizSummary } from '../../model/QuizSummary.model'
import RecordingDetails from '../RecordingDetails/RecordingDetails'
import RecordingPlayer from '../RecordingPlayer/RecordingPlayer'
import useQuizQuestions from './useQuizQuestions'
import { Box } from '@mui/system'

export type QuizQuestionsProps = {
    params: QuizParams
    onRepeatQuiz: () => void
    onFinished: (summary: QuizSummary) => void
}

export default function QuizQuestions ({ params, onRepeatQuiz, onFinished }: QuizQuestionsProps): ReactElement {
    const {
        question,
        recording,
        correctAnswer,
        incorrectAnswer,
        loading,
        progress,
        answered,
        recordingDetailsOpened,
        insufficientBirdRecordings,
        nextRecordingEnabled,
        handleAnswerClick,
        handleNextRecording,
        handleNextQuestion,
        handleFinished,
        toggleRecordingDetails
    } = useQuizQuestions(params, onFinished)

    if (loading) {
        return (<Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <CircularProgress variant="indeterminate" value={progress} />
            <Box sx={{ marginLeft: '1rem' }}>Připravuji kvíz...</Box>
        </Box >)
    }

    if (insufficientBirdRecordings.length > 0) {
        return (<div>
            <p>Pro tyto druhy bohužel není k dispozici dostatečný počet nahrávek, upravte prosím parametry kvízu a zkuste to znovu</p>
            <ul>
                {insufficientBirdRecordings.map(br => <li key={br.bird.xenoCantoName}>{br.bird.czechName} ({br.recordings.length})</li>)}
            </ul>
            <div>
                <Button
                    onClick={onRepeatQuiz}
                    variant="contained"
                    color="primary">Upravit kvíz</Button>
            </div>
        </div>)
    }

    const isLastQuestion = question?.index === params.questionCount
    const isEducation = params.mode === 'education'

    return (<>
        <Typography variant="h5">
            Otázka {question?.index}/{params.questionCount}
        </Typography>

        <Box sx={{ marginTop: '1rem' }}>
            <RecordingPlayer recording={recording} autoPlay={true}></RecordingPlayer>
        </Box>

        <Box sx={{ marginTop: '1rem' }}>
            <Button onClick={toggleRecordingDetails(true)}>Informace o nahrávce</Button>
            <Drawer anchor="right" open={recordingDetailsOpened} onClose={toggleRecordingDetails(false)}>
                <RecordingDetails recording={recording}></RecordingDetails>
            </Drawer>
        </Box>

        <Box sx={{
            textAlign: 'center',
            marginTop: '1rem'
        }}>
            {params.birds.map((bird, index) => {
                return <Button
                    onClick={() => { handleAnswerClick(bird) }}
                    sx={{
                        margin: '1rem',
                        whiteSpace: 'nowrap'
                    }}
                    variant="outlined"
                    disabled={!isEducation && answered}
                    key={index}>{bird.czechName}
                </Button>
            })}
        </Box>

        {correctAnswer && <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1rem',
            color: 'green'
        }}>Správná odpověď</Box>}

        {incorrectAnswer && <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1rem',
            color: 'red'
        }}>Nesprávná odpověď</Box>}

        {isEducation &&
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '1rem'
            }}>
                <Button
                    disabled={!nextRecordingEnabled}
                    onClick={handleNextRecording}>{nextRecordingEnabled ? 'Zkusit jinou nahrávku' : 'Nedostatek nahrávek, již nelze zkusit jinou nahrávku'}</Button>
            </Box>
        }

        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1rem'
        }}>
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
        </Box>
    </>)
}
