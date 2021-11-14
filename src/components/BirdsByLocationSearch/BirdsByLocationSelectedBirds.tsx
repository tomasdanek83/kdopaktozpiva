import { IconButton, List, ListItem, ListItemText } from '@mui/material'
import React, { ReactElement } from 'react'
import { Bird } from '../../model/Bird.model'
import DeleteIcon from '@mui/icons-material/Delete'

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
                    key={bird.xenoCantoName}
                    secondaryAction={
                        <IconButton
                            edge="end"
                            aria-label="remove"
                            onClick={() => onRemoveBird(bird)}>
                            <DeleteIcon />
                        </IconButton>
                    }>
                    <ListItemText
                        primary={bird.czechName} />
                </ListItem>)}
        </List>
    )
}
