import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { ReactElement } from 'react'
import { Recording } from '../../api/Recording.model'

export type RecordingDetailsProps = {
    recording?: Recording
}

export default function RecordingDetails ({ recording }: RecordingDetailsProps): ReactElement {
    if (recording == null) {
        return (<></>)
    }

    return (
        <Box sx={{
            padding: '1rem'
        }}>
            <Typography variant="h5">Informace o nahrávce</Typography>
            <Typography>
                <p></p>
                <table>
                    <tbody>
                        <tr>
                            <th>Odkaz</th>
                            <td><a href={recording.url}>{recording.url.replace('//', '')}</a></td>
                        </tr>
                        <tr>
                            <th>Lokalita</th>
                            <td>{recording.loc}</td>
                        </tr>
                    </tbody>
                </table>
            </Typography>
        </Box>
    )
}
