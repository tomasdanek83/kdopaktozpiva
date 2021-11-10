import { LinearProgress, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { ReactElement, useState } from 'react'
import { BirdsByLocationFilters } from '../../api/BirdsByLocationFilters.model'
import BirdsByLocationSearchForm from './BirdsByLocationSearchForm'
import BirdsByLocationSearchResults from './BirdsByLocationSearchResults'
import useBirdsByLocationSearch from './useBirdsByLocationSearch'

const defaultValues: BirdsByLocationFilters = {
    lat: 49.2111914,
    lng: 16.5143472,
    radius: 10,
    timerange: 60
}

export default function BirdsByLocationSearch (): ReactElement {
    const [filters, setFilters] = useState<BirdsByLocationFilters>(defaultValues)

    const { birdQuantities, loading, search } = useBirdsByLocationSearch()

    const handleSearch = (filters: BirdsByLocationFilters): void => {
        setFilters(filters)
        search(filters)
    }

    return (
        <Box sx={{
            padding: '1rem'
        }}>
            <Typography variant="h5">Přidat druhy podle lokality</Typography>

            {filters != null &&
                <BirdsByLocationSearchForm
                    defaultValues={filters}
                    onSearch={handleSearch}></BirdsByLocationSearchForm>
            }

            {loading &&
                <Box>
                    <LinearProgress />
                </Box>
            }

            {birdQuantities != null &&
                <BirdsByLocationSearchResults birdQuantities={birdQuantities}></BirdsByLocationSearchResults>
            }
        </Box>
    )
}
