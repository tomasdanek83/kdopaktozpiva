import { Typography } from '@mui/material'
import React, { ReactElement } from 'react'

const version = '0.3'

export default function About (): ReactElement {
    return (<>
        <Typography variant="h5">
            O aplikaci
        </Typography>

        <Typography variant="body1">
            Autor aplikace: Tomáš Daněk
        </Typography>

        <Typography variant="body1">
            Připomínky a náměty na vylepšení pište prosím na <a href="mailto:info@kdopaktozpiva.cz">info@kdopaktozpiva.cz</a>
        </Typography>

        <Typography variant="h6">
            Zdroje dat
        </Typography>

        <ul>
            <li><a href="https://www.xeno-canto.org/">www.xeno-canto.org</a> - Nahrávky</li>
        </ul>

        <Typography variant="body1">
            Verze aplikace: {version}
        </Typography>
    </>)
}
