import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { Recording } from '../../api/Recording.model'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '1rem'
        }
    })
)
export type RecordingDetailsProps = {
    recording?: Recording
}

export default function RecordingDetails ({ recording }: RecordingDetailsProps): ReactElement {
    if (recording == null) {
        return (<></>)
    }

    const classes = useStyles()

    return (<div className={classes.root}>
        <Typography variant="h5">Informace o nahrávce</Typography>
        <Typography>
            <p></p>
            <table>
                <tr>
                    <th>Odkaz</th>
                    <td><a href={recording.url}>{recording.url.replace('//', '')}</a></td>
                </tr>
                <tr>
                    <th>Lokalita</th>
                    <td>{recording.loc}</td>
                </tr>
            </table>
        </Typography>
    </div>)
}
