import { IconButton, List, ListItem, ListItemText } from '@mui/material'
import React, { ReactElement } from 'react'
import { BirdByLocationQuantity } from '../../model/BirdQuantity.model'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'

export type BirdsByLocationSearchResultsProps = {
    birdQuantities: BirdByLocationQuantity[]
    toggleBirdSelection: (birdQuantity: BirdByLocationQuantity) => void
}

export default function BirdsByLocationSearchResults ({
    birdQuantities,
    toggleBirdSelection
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
                <ListItem sx={{
                    cursor: 'pointer'
                }}
                    key={bq.bird.xenoCantoName}
                    onClick={() => toggleBirdSelection(bq)}
                    secondaryAction={
                        <IconButton
                            edge="end"
                            aria-label="add"
                            disabled={bq.selected}>
                            {!bq.selected ? <RadioButtonUncheckedIcon /> : <CheckCircleIcon color="primary" />}
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
