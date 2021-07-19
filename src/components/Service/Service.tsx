import React, { ReactElement, useEffect } from 'react'
import { birdsCzech } from '../../birdsCzech'
// import { SearchFilters } from '../../api/SearchFilters.model'
import { birdsWP } from '../../birdsWP'
// import { useRecordingsApi } from '../../hooks/useRecordingsApi'
// import { Bird } from '../../model/Bird.model'

// const birdsWithNoRecordings: Bird[] = [
//     {
//         czechName: 'chřástal hnědoprsý',
//         scientificName: 'Porzana fusca'
//     },
//     {
//         czechName: 'chřástal malý',
//         scientificName: 'Porzana parva'
//     },
//     {
//         czechName: 'chřástal nejmenší',
//         scientificName: 'Porzana pusilla'
//     },
//     {
//         czechName: 'chřástal žlutozobý',
//         scientificName: 'Amaurornis flavirostra'
//     },
//     {
//         czechName: 'pěnice baleárská',
//         scientificName: 'Sylvia balearica'
//     },
//     {
//         czechName: 'pěnice arabská',
//         scientificName: 'Sylvia leucomelaena'
//     },
//     {
//         czechName: 'pěnice bělohrdlá',
//         scientificName: 'Sylvia melanocephala'
//     },
//     {
//         czechName: 'pěnice brýlatá',
//         scientificName: 'Sylvia conspicillata'
//     },
//     {
//         czechName: 'pěnice černolící',
//         scientificName: 'Sylvia mystacea'
//     },
//     {
//         czechName: 'pěnice hnědokřídlá',
//         scientificName: 'Sylvia communis'
//     },
//     {
//         czechName: 'pěnice dlouhozobá',
//         scientificName: 'Sylvia crassirostris'
//     },
//     {
//         czechName: 'pěnice horská',
//         scientificName: 'Sylvia althaea'
//     },
//     {
//         czechName: 'pěnice jemenská',
//         scientificName: 'Sylvia buryi'
//     },
//     {
//         czechName: 'pěnice kaštanová',
//         scientificName: 'Sylvia undata'
//     },
//     {
//         czechName: 'pěnice kyperská',
//         scientificName: 'Sylvia melanothorax'
//     },
//     {
//         czechName: 'pěnice ligurská',
//         scientificName: 'Sylvia subalpina'
//     },
//     {
//         czechName: 'pěnice malá',
//         scientificName: 'Sylvia nana'
//     },
//     {
//         czechName: 'pěnice mistrovská',
//         scientificName: 'Sylvia hortensis'
//     },
//     {
//         czechName: 'pěnice pustinná',
//         scientificName: 'Sylvia minula'
//     },
//     {
//         czechName: 'pěnice pouštní',
//         scientificName: 'Sylvia deserti'
//     },
//     {
//         czechName: 'pěnice pokřovní',
//         scientificName: 'Sylvia Sylvia'
//     },
//     {
//         czechName: 'pěnice sardinská',
//         scientificName: 'Sylvia sarda'
//     },
//     {
//         czechName: 'pěnice severoafrická',
//         scientificName: 'Sylvia deserticola'
//     },
//     {
//         czechName: 'pěnice turecká',
//         scientificName: 'Sylvia ruppeli'
//     },
//     {
//         czechName: 'pěnice vlašská',
//         scientificName: 'Sylvia nisoria'
//     },
//     {
//         czechName: 'pěnice vousatá',
//         scientificName: 'Sylvia cantillans'
//     },
//     {
//         czechName: 'pěnice západní',
//         scientificName: 'Sylvia iberiae'
//     }
// ]

export function Service (): ReactElement {
    // const [birdData, setBirdData] = useState<Bird[]>([])
    // const [errors, setErrors] = useState<Bird[]>([])

    // const recordingsApi = useRecordingsApi()

    // useEffect(() => {
    //     const loadBirdRecordings = (): void => {
    //         birdsWithNoRecordings.forEach(bird => {
    //             const filters: SearchFilters = {
    //                 name: bird.scientificName,
    //                 type: 'all'
    //             }

    //             recordingsApi.search(filters, 1).then(result => {
    //                 if (Number(result.numRecordings) === 0) {
    //                     console.error(`No recordings found for ${bird.scientificName}`)
    //                     setErrors(prevState => [...prevState, bird])
    //                 }

    //                 const recording = result.recordings.length > 0 ? result.recordings[0] : null

    //                 setBirdData(prevState => [...prevState, {
    //                     ...bird,
    //                     englishName: recording?.en
    //                 }])
    //             }).catch(error => {
    //                 console.error('XenoCantoApi search failed', error)
    //             })
    //         })
    //     }

    //     loadBirdRecordings()
    // }, [])

    // useEffect(() => {
    //     if (birdData.length === birdsWithNoRecordings.length) {
    //         const birdDataSorted = birdData.sort((a, b) => a.scientificName.localeCompare(b.scientificName))
    //         console.log('Errors', errors)
    //         console.log(birdDataSorted)
    //         console.log(JSON.stringify(birdDataSorted, null, '\t'))
    //     }
    // }, [birdData])

    useEffect(() => {
        const joined = birdsWP.map(bird => {
            return {
                ...bird,
                isCzech: birdsCzech.some(bc => bc.czech === bird.czechName)
            }
        })
        console.log('wp.isCzech=true', joined.filter(j => j.isCzech))
        // console.log(joined)
        console.log(JSON.stringify(joined, null, '\t'))

        console.log(birdsCzech.filter(bc => !birdsWP.some(bwp => (bwp.czechName === bc.czech))))
    }, [])

    return (<></>)
}
