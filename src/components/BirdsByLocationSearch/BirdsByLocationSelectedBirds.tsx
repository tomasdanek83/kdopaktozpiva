import { IconButton, List, ListItem, ListItemText } from '@mui/material'
import React, { ReactElement } from 'react'
import { Bird } from '../../model/Bird.model'
import ClearIcon from '@mui/icons-material/Clear'

export type BirdsByLocationSelectedBirdsProps = {
    birds: Bird[]
    onRemoveBird: (bird: Bird) => void
}

export default function BirdsByLocationSelectedBirds ({
    birds,
    onRemoveBird
}: BirdsByLocationSelectedBirdsProps): ReactElement {
    return (
        <List sx={{
            height: '500px',
            overflow: 'auto'
        }}>
            {birds.map(bird =>
                <ListItem
                    sx={{
                        cursor: 'pointer'
                    }}
                    key={bird.xenoCantoName}
                    onClick={() => onRemoveBird(bird)}
                    secondaryAction={
                        <IconButton
                            edge="end"
                            aria-label="remove">
                            <ClearIcon />
                        </IconButton>
                    }>
                    <ListItemText
                        primary={bird.czechName} />
                </ListItem>)}
        </List>
    )
}
