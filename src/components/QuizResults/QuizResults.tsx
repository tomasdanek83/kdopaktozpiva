import React, { ReactElement } from 'react'
import { QuizSummary } from '../../model/QuizSummary.model'
import { Button, createStyles, makeStyles, Theme, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buttons: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1rem'
        }
    })
)

export type QuizResultsProps = {
    summary: QuizSummary
    onRepeatQuiz: () => void
    onNewQuiz: () => void
}

export default function QuizResults ({ summary, onRepeatQuiz, onNewQuiz }: QuizResultsProps): ReactElement {
    const classes = useStyles()

    return (<>
        <Typography variant="h5">
            Výsledky
        </Typography>
        <div>Gratulujeme!</div>
        <div className={classes.buttons}>
            <Button
                onClick={onRepeatQuiz}
                variant="contained"
                color="primary">Spustit znovu</Button>
            <Button
                onClick={onNewQuiz}
                variant="contained"
                color="primary">Vytvořit nový kvíz</Button>
        </div>
    </>)
}
