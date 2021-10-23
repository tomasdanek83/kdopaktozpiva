import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { ReactElement, useState } from 'react'
import { BirdsByLocationFilters } from '../../api/BirdsByLocationFilters.model'
import { useBirdsByLocationApi } from '../../hooks/useBirdsByLocationApi'
import BirdsByLocationSearchForm from './BirdsByLocationSearchForm'
import { useSnackbar } from 'notistack'
import { BirdQuantity } from '../../api/BirdQuantity.model'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '1rem'
        }
    })
)

const defaultValues: BirdsByLocationFilters = {
    lat: 49.2111914,
    lng: 16.5143472,
    radius: 10,
    timerange: 60
}

export default function BirdsByLocationSearch (): ReactElement {
    const [filters] = useState<BirdsByLocationFilters>(defaultValues)
    const [birdQuantities, setBirdQuantities] = useState<BirdQuantity[]>([])

    const classes = useStyles()

    const { getBirdsByLocation } = useBirdsByLocationApi()
    const { enqueueSnackbar } = useSnackbar()

    const handleSearch = (filters: BirdsByLocationFilters): void => {
        console.log('handleSearch', filters)

        getBirdsByLocation(filters).then(result => {
            console.log('AVIF search result', result)

            setBirdQuantities(result)
        }).catch(error => {
            console.error('AVIF search failed', error)
            enqueueSnackbar('Failed to birds by location', { variant: 'error' })
        })
    }

    return (<div className={classes.root}>
        <Typography variant="h5">Přidat druhy podle lokality</Typography>

        {filters != null && <BirdsByLocationSearchForm
            defaultValues={filters}
            onSearch={handleSearch}></BirdsByLocationSearchForm>
        }

        {birdQuantities.map(bq => <div key={bq.name}>{bq.name}: {bq.quantity}</div>)}
    </div>)
}
