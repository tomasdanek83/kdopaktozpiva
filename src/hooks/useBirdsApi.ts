import { birdsWP } from '../birdsWP'
import { Bird } from '../model/Bird.model'

export type BirdsApi = {
    getAllBirds: () => Bird[]
    getBirdByName: (name: string) => Bird | undefined
}

const getAllBirds = (): Bird[] => {
    return birdsWP
}

const getBirdByName = (name: string): Bird | undefined => {
    return getAllBirds().find(b => b.czechName === name || b.scientificName === name)
}

export const useBirdsApi = (): BirdsApi => {
    return {
        getAllBirds,
        getBirdByName
    }
}
