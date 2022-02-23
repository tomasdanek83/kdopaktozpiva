import { Button, Grid, LinearProgress, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { ReactElement, useState } from 'react'
import { BirdsByLocationFilters } from '../../api/BirdsByLocationFilters.model'
import { Bird } from '../../model/Bird.model'
import { BirdByLocationQuantity } from '../../model/BirdQuantity.model'
import BirdsByLocationSearchForm from './BirdsByLocationSearchForm'
import BirdsByLocationSearchResults from './BirdsByLocationSearchResults'
import BirdsByLocationSelectedBirds from './BirdsByLocationSelectedBirds'
import useBirdsByLocationSearch from './useBirdsByLocationSearch'

const defaultValues: BirdsByLocationFilters = {
    lat: 49.2111914,
    lng: 16.5143472,
    radius: 5,
    timerange: 12,
    monthFrom: 0,
    monthTo: 0
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

    const handleToggleBirdSelection = (birdQuantity: BirdByLocationQuantity): void => {
        if (birdQuantity.selected) {
            handleRemoveBird(birdQuantity.bird)
        } else {
            setSelectedBirds(birds => [...birds, birdQuantity.bird])
            markAsSelected(birdQuantity.bird, true)
        }
    }

    const handleRemoveBird = (bird: Bird): void => {
        setSelectedBirds(birds => birds.filter(b => b !== bird))
        markAsSelected(bird, false)
    }

    return (
        <Stack
            spacing={2}>
            <Box sx={{
                flexShrink: 0
            }}>
                <Typography variant="h5">Přidat druhy podle lokality</Typography>
            </Box>

            <Box sx={{
                flexGrow: 1,
                minHeight: '100%',
                alignItems: 'stretch'
            }}>
                <Grid
                    container
                    spacing={2}
                >
                    <Grid item xs={4}>
                        {filters != null &&
                            <BirdsByLocationSearchForm
                                defaultValues={filters}
                                onSearch={handleSearch}></BirdsByLocationSearchForm>
                        }
                    </Grid>
                    <Grid item xs={4}>
                        {loading &&
                            <Box>
                                <LinearProgress />
                            </Box>
                        }

                        {birdQuantities != null &&
                            <BirdsByLocationSearchResults
                                birdQuantities={birdQuantities}
                                toggleBirdSelection={handleToggleBirdSelection}></BirdsByLocationSearchResults>
                        }
                    </Grid>
                    <Grid item xs={4}>
                        <BirdsByLocationSelectedBirds
                            birds={selectedBirds}
                            onRemoveBird={handleRemoveBird}></BirdsByLocationSelectedBirds>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{
                flexShrink: 0
            }}>
                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    spacing={2}>
                    <Button
                        variant="text"
                        onClick={onCancel}>Zrušit</Button>
                    <Button
                        variant="contained"
                        onClick={() => onConfirm(selectedBirds)}>Použít</Button>
                </Stack>
            </Box>
        </Stack>
    )
}
