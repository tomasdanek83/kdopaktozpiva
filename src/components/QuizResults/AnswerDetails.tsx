import { Accordion, AccordionDetails, AccordionSummary, makeStyles, Theme, createStyles } from '@material-ui/core'
import React, { ReactElement } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Answer } from '../../model/Answer.model'
import RecordingPlayer from '../RecordingPlayer/RecordingPlayer'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        index: {
            marginLeft: '1rem'
        },
        question: {
            marginLeft: '1rem'
        },
        correctAnswer: {
            marginLeft: '1rem',
            color: 'green'
        },
        incorrectAnswer: {
            marginLeft: '1rem',
            color: 'red'
        }
    })
)

export type AnswerDetailsProps = {
    answer: Answer
}

export default function AnswerDetails ({ answer }: AnswerDetailsProps): ReactElement {
    const classes = useStyles()

    const correct = answer.bird === answer.pickedBird

    return (<>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <span className={classes.index}>{answer.index}.</span>
                <span className={classes.question}>{answer.bird.czechName}</span>
                <span className={correct ? classes.correctAnswer : classes.incorrectAnswer}>{answer.pickedBird.czechName}</span>
            </AccordionSummary>
            <AccordionDetails>
                <RecordingPlayer recording={answer.recording} />
            </AccordionDetails>
        </Accordion>
    </>)
}
