import { Button, Grid, LinearProgress, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { ReactElement, useState } from 'react'
import { BirdsByLocationFilters } from '../../api/BirdsByLocationFilters.model'
import { Bird } from '../../model/Bird.model'
import BirdsByLocationSearchForm from './BirdsByLocationSearchForm'
import BirdsByLocationSearchResults from './BirdsByLocationSearchResults'
import BirdsByLocationSelectedBirds from './BirdsByLocationSelectedBirds'
import useBirdsByLocationSearch from './useBirdsByLocationSearch'

const defaultValues: BirdsByLocationFilters = {
    lat: 49.2111914,
    lng: 16.5143472,
    radius: 5,
    timerange: 12
}

export type BirdsByLocationSearchProps = {
    onConfirm: (selectedBirds: Bird[]) => void
    onCancel: () => void
}

export default function BirdsByLocationSearch ({
    onConfirm,
    onCancel
}: BirdsByLocationSearchProps): ReactElement {
    const [filters, setFilters] = useState<BirdsByLocationFilters>(defaultValues)
    const [selectedBirds, setSelectedBirds] = useState<Bird[]>([])

    const { birdQuantities, loading, search, markAsSelected } = useBirdsByLocationSearch()

    const handleSearch = (filters: BirdsByLocationFilters): void => {
        setFilters(filters)
        search(filters)
    }

    const handleAddBird = (bird: Bird): void => {
        setSelectedBirds(birds => [...birds, bird])
        markAsSelected(bird, true)
    }

    const handleRemoveBird = (bird: Bird): void => {
        setSelectedBirds(birds => birds.filter(b => b !== bird))
        markAsSelected(bird, false)
    }

    return (
        <Box sx={{
            padding: '1rem'
        }}>
            <Typography variant="h5">Přidat druhy podle lokality</Typography>

            <Grid container spacing={2}>
                <Grid item xs={8}>
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
                        <BirdsByLocationSearchResults
                            birdQuantities={birdQuantities}
                            onAddBird={handleAddBird}></BirdsByLocationSearchResults>
                    }
                </Grid>
                <Grid item xs={4}>
                    <BirdsByLocationSelectedBirds
                        birds={selectedBirds}
                        onRemoveBird={handleRemoveBird}></BirdsByLocationSelectedBirds>
                </Grid>

                <Grid
                    container
                    item
                    xs={12}
                    justifyContent="flex-end">
                    <Button
                        variant="text"
                        onClick={onCancel}>Zrušit</Button>
                    <Button
                        variant="contained"
                        onClick={() => onConfirm(selectedBirds)}>Použít</Button>
                </Grid>
            </Grid>
        </Box >
    )
}
