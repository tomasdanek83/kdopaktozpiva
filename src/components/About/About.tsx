import { Typography } from '@material-ui/core'
import React, { ReactElement } from 'react'

export default function About (): ReactElement {
    return (<>
        <Typography variant="h5">
            O aplikaci
        </Typography>

        <Typography variant="body1">
            <p>Autor aplikace: Tomáš Daněk</p>
            <p>Připomínky a náměty na vylepšení pište prosím na <a href="mailto:info@kdopaktozpiva.cz">info@kdopaktozpiva.cz</a></p>
        </Typography>

        <Typography variant="h6">
            Zdroje dat
        </Typography>

        <Typography variant="body1">
            <ul>
                <li><a href="https://www.xeno-canto.org/">www.xeno-canto.org</a> - Nahrávky</li>
            </ul>
        </Typography>
    </>)
}
