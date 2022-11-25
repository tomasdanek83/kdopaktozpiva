import { useSnackbar } from 'notistack-v5'
import { useEffect, useState } from 'react'
import { BirdQuantity } from '../../api/BirdQuantity.model'
import { BirdsByLocationFilters } from '../../api/BirdsByLocationFilters.model'
import { useBirdsApi } from '../../hooks/useBirdsApi'
import { useBirdsByLocationApi } from '../../hooks/useBirdsByLocationApi'
import { Bird } from '../../model/Bird.model'
import { BirdByLocationQuantity } from '../../model/BirdQuantity.model'

export type useBirdsByLocationSearchState = {
    birdQuantities?: BirdByLocationQuantity[]
    loading: boolean
    search: (filters: BirdsByLocationFilters) => void
    markAsSelected: (bird: Bird, selected: boolean) => void
}

export default function useBirdsByLocationSearch (): useBirdsByLocationSearchState {
    const [birdQuantities, setBirdQuantities] = useState<BirdByLocationQuantity[]>()
    const [loading, setLoading] = useState<boolean>(false)
    const [allBirds, setAllBirds] = useState<Bird[]>([])

    const { getBirdsByLocation } = useBirdsByLocationApi()
    const { enqueueSnackbar } = useSnackbar()

    const { getAllCzechBirds } = useBirdsApi()

    useEffect(() => {
        setAllBirds(getAllCzechBirds())
    }, [])

    const getBirdQuantities = (quantities: BirdQuantity[]): BirdByLocationQuantity[] => {
        const sortedQuantities = quantities.sort((a, b) => b.quantity - a.quantity)

        const unknownBirds = sortedQuantities.filter(bq => !allBirds.some(b => b.xenoCantoName === bq.name || b.avifName === bq.name))

        if (unknownBirds.length > 0) {
            console.error('AVIF returned unknown birds:', unknownBirds)
        }

        const mappedQuantities = sortedQuantities
            .filter(bq => !unknownBirds.some(ub => ub.name === bq.name))
            .map(bq => {
                return {
                    bird: allBirds.find(b => b.xenoCantoName === bq.name || b.avifName === bq.name) as Bird,
                    quantity: bq.quantity,
                    selected: false
                }
            })

        return removeDuplicates(mappedQuantities)
    }

    const removeDuplicates = (quantities: BirdByLocationQuantity[]): BirdByLocationQuantity[] => {
        const duplicates = quantities.filter(bq => quantities.some(bqi => bq.bird.xenoCantoName === bqi.bird.xenoCantoName && bqi.quantity > bq.quantity))

        console.log('removeDuplicates', duplicates)

        return quantities.filter(bq => !duplicates.includes(bq))
    }

    const search = (filters: BirdsByLocationFilters): void => {
        console.log('search', filters)
        setLoading(true)

        getBirdsByLocation(filters).then(result => {
            console.log('AVIF search result', result)
            setLoading(false)

            setBirdQuantities(getBirdQuantities(result))
        }).catch(error => {
            console.error('AVIF search failed', error)
            setLoading(false)
            enqueueSnackbar('Failed to birds by location', { variant: 'error' })
        })
    }

    const markAsSelected = (bird: Bird, selected: boolean): void => {
        if (birdQuantities == null) {
            return
        }

        const index = birdQuantities.findIndex(b => b.bird.xenoCantoName === bird.xenoCantoName)

        if (index === -1) {
            return
        }

        const birdToUpdate = birdQuantities[index]

        birdToUpdate.selected = selected

        setBirdQuantities([
            ...birdQuantities.slice(0, index),
            birdToUpdate,
            ...birdQuantities.slice(index + 1)
        ])
    }

    return {
        birdQuantities,
        loading,
        search,
        markAsSelected
    }
}
