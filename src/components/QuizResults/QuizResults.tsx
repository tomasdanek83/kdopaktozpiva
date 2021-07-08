import React, { ReactElement } from 'react'
import { QuizSummary } from '../../model/QuizSummary.model'
import { Button, Typography } from '@material-ui/core'

export type QuizResultsProps = {
    summary: QuizSummary
    onNewQuiz: () => void
}

export default function QuizResults ({ summary, onNewQuiz }: QuizResultsProps): ReactElement {
    return (<>
        <Typography variant="h5">
            Výsledky
        </Typography>
        <div>Gratulujeme!</div>
        <Button
            onClick={onNewQuiz}
            variant="contained"
            color="primary">Další otázka</Button>

    </>)
}
