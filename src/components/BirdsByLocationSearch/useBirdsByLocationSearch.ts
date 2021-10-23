import { useSnackbar } from 'notistack'
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

        const unknownBirds = sortedQuantities.filter(bq => !allBirds.some(b => b.scientificName === bq.name))

        if (unknownBirds.length > 0) {
            console.error('AVIF returned unknown birds:', unknownBirds)
        }

        return sortedQuantities
            .filter(bq => !unknownBirds.some(ub => ub.name === bq.name))
            .map(bq => {
                return {
                    bird: allBirds.find(b => b.scientificName === bq.name) as Bird,
                    quantity: bq.quantity
                }
            })
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

    return {
        birdQuantities,
        loading,
        search
    }
}
