import React, { ReactElement } from 'react'
import { BirdByLocationQuantity } from '../../model/BirdQuantity.model'

export type BirdsByLocationSearchResultsProps = {
    birdQuantities: BirdByLocationQuantity[]
}

export default function BirdsByLocationSearchResults ({ birdQuantities }: BirdsByLocationSearchResultsProps): ReactElement {
    if (birdQuantities.length === 0) {
        return (<div>Žádné výsledky</div>)
    }

    return (<>
        {birdQuantities.map(bq => <div key={bq.bird.scientificName}>{bq.bird.czechName}: {bq.quantity}</div>)}
    </>)
}
