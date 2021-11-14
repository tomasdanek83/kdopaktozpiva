import { birdsWP } from '../birdsWP'
import { Bird } from '../model/Bird.model'

export type BirdsApi = {
    getAllBirds: () => Bird[]
    getAllCzechBirds: () => Bird[]
    getBirdByName: (name: string) => Bird | undefined
}

const getAllBirds = (): Bird[] => {
    return birdsWP
}

const getAllCzechBirds = (): Bird[] => {
    return birdsWP.filter(b => b.isCzech)
}
const getBirdByName = (name: string): Bird | undefined => {
    return getAllBirds().find(b => b.czechName === name || b.xenoCantoName === name)
}

export const useBirdsApi = (): BirdsApi => {
    return {
        getAllBirds,
        getAllCzechBirds,
        getBirdByName
    }
}
