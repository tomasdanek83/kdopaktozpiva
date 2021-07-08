import React, { ReactElement } from 'react'
import { Recording } from '../../api/Recording.model'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/src/styles.scss'

export type RecordingPlayerProps = {
    recording?: Recording
}

export default function RecordingPlayer ({ recording }: RecordingPlayerProps): ReactElement {
    return (<>
        <div>
            <AudioPlayer
                autoPlay
                src={recording?.file}
            /></div>
    </>)
}
