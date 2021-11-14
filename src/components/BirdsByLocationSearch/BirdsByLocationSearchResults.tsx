import { IconButton, List, ListItem, ListItemText } from '@mui/material'
import React, { ReactElement } from 'react'
import { BirdByLocationQuantity } from '../../model/BirdQuantity.model'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Bird } from '../../model/Bird.model'

export type BirdsByLocationSearchResultsProps = {
    birdQuantities: BirdByLocationQuantity[]
    onAddBird: (bird: Bird) => void
}

export default function BirdsByLocationSearchResults ({
    birdQuantities,
    onAddBird
}: BirdsByLocationSearchResultsProps): ReactElement {
    if (birdQuantities.length === 0) {
        return (<div>Žádné výsledky</div>)
    }

    return (
        <List sx={{
            height: '500px',
            overflow: 'auto'
        }}>
            {birdQuantities.map(bq =>
                <ListItem
                    key={bq.bird.xenoCantoName}
                    secondaryAction={
                        <IconButton
                            edge="end"
                            aria-label="add"
                            onClick={() => onAddBird(bq.bird)}
                            disabled={bq.selected}>
                            {!bq.selected ? <AddCircleOutlineIcon color="primary" /> : <CheckCircleIcon />}
                        </IconButton>
                    }>
                    <ListItemText
                        primary={bq.bird.czechName}
                        secondary={bq.quantity} />
                </ListItem>)
            }
        </List >
    )
}
