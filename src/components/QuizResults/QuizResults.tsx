import React, { ReactElement } from 'react'
import { QuizSummary } from '../../model/QuizSummary.model'
import { Button, createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import AnswerDetails from './AnswerDetails'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        summary: {
            marginBottom: '1rem'
        },
        buttons: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1rem'
        },
        button: {
            marginLeft: '1rem'
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

    const correctCount = summary.answers.filter(answer => answer.bird === answer.pickedBird).length

    return (<>
        <Typography variant="h5">
            Výsledky
        </Typography>

        <div className={classes.summary}>Správné odpovědi: {correctCount} ze {summary.answers.length}</div>

        <Typography variant="h6">
            Vaše odpovědi
        </Typography>

        {summary.answers.map(answer => {
            return <AnswerDetails answer={answer} key={answer.index}></AnswerDetails>
        })}

        <div className={classes.buttons}>
            <Button
                className={classes.button}
                onClick={onRepeatQuiz}
                variant="contained"
                color="primary">Spustit znovu</Button>
            <Button
                className={classes.button}
                onClick={onNewQuiz}
                variant="contained"
                color="primary">Vytvořit nový kvíz</Button>
        </div>
    </>)
}
