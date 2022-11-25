import React, { ReactElement } from 'react'
import { QuizSummary } from '../../model/QuizSummary.model'
import AnswerDetails from './AnswerDetails'
import { Box } from '@mui/system'
import { Button, Typography } from '@mui/material'

export type QuizResultsProps = {
    summary: QuizSummary
    onRepeatQuiz: () => void
    onNewQuiz: () => void
}

export default function QuizResults ({ summary, onRepeatQuiz, onNewQuiz }: QuizResultsProps): ReactElement {
    const correctCount = summary.answers.filter(answer => answer.bird === answer.pickedBird).length

    return (<>
        <Typography variant="h5">
            Výsledky
        </Typography>

        <Box sx={{
            marginBottom: '1rem'
        }}>Správné odpovědi: {correctCount} ze {summary.answers.length}</Box>

        <Typography variant="h6">
            Vaše odpovědi
        </Typography>

        {summary.answers.map(answer => {
            return <AnswerDetails answer={answer} key={answer.index}></AnswerDetails>
        })}

        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1rem'
        }}>
            <Button
                sx={{
                    marginLeft: '1rem'
                }}
                onClick={onRepeatQuiz}
                variant="contained"
                color="primary">Spustit znovu</Button>
            <Button
                sx={{
                    marginLeft: '1rem'
                }}
                onClick={onNewQuiz}
                variant="contained"
                color="primary">Vytvořit nový kvíz</Button>
        </Box>
    </>)
}
