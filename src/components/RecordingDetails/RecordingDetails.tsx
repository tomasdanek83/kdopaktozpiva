import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { Recording } from '../../api/Recording.model'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

export type RecordingDetailsProps = {
    recording?: Recording
}

export default function RecordingDetails ({ recording }: RecordingDetailsProps): ReactElement {
    if (recording == null) {
        return (<></>)
    }

    return (<>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Informace o nahrávce</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    <div><a href={recording.url}>{recording.url}</a></div>
                </Typography>
            </AccordionDetails>
        </Accordion>
    </>)
}
