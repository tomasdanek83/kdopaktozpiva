import React, { ReactElement } from 'react'
import { Answer } from '../../model/Answer.model'
import RecordingPlayer from '../RecordingPlayer/RecordingPlayer'
import { Box } from '@mui/system'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export type AnswerDetailsProps = {
    answer: Answer
}

export default function AnswerDetails ({ answer }: AnswerDetailsProps): ReactElement {
    const correct = answer.bird === answer.pickedBird

    return (<>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Box sx={{
                    marginLeft: '1rem'
                }}>{answer.index}.</Box>
                <Box sx={{
                    marginLeft: '1rem'
                }}>{answer.bird.czechName}</Box>
                <Box sx={{
                    marginLeft: '1rem',
                    color: correct ? 'green' : 'red'
                }}>{answer.pickedBird.czechName}</Box>
            </AccordionSummary>
            <AccordionDetails>
                <RecordingPlayer recording={answer.recording} />
            </AccordionDetails>
        </Accordion>
    </>)
}
