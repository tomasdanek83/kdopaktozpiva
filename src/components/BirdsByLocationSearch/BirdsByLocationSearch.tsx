import { Button, Grid, LinearProgress, Stack, Tab, Tabs, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { ReactElement, useState } from 'react'
import { BirdsByLocationFilters } from '../../api/BirdsByLocationFilters.model'
import { Bird } from '../../model/Bird.model'
import { BirdByLocationQuantity } from '../../model/BirdQuantity.model'
import BirdsByLocationSearchForm from './BirdsByLocationSearchForm'
import BirdsByLocationSearchResults from './BirdsByLocationSearchResults'
import BirdsByLocationSelectedBirds from './BirdsByLocationSelectedBirds'
import useBirdsByLocationSearch from './useBirdsByLocationSearch'
import { Map, MouseControl, KeyboardControl, SyncControl, ZoomControl } from 'react-mapycz'

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

type TabPanelProps = {
    children?: React.ReactNode
    index: number
    value: number
}

const TabPanel = (props: TabPanelProps): ReactElement => {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    )
}

export default function BirdsByLocationSearch ({
    onConfirm,
    onCancel
}: BirdsByLocationSearchProps): ReactElement {
    const [filters, setFilters] = useState<BirdsByLocationFilters>(defaultValues)
    const [selectedBirds, setSelectedBirds] = useState<Bird[]>([])
    const [tabValue, setTabValue] = React.useState(0)

    const handleTabChange = (event: React.SyntheticEvent, newValue: number): void => {
        setTabValue(newValue)
    }

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

    const tabsA11yProps = (index: number): any => {
        return {
            id: `tab-${index}`,
            'aria-controls': `tabpanel-${index}`
        }
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
                    <Grid item xs={8}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
                                <Tab label="Mapa" {...tabsA11yProps(0)} />
                                <Tab label="Výsledky" {...tabsA11yProps(1)} />
                            </Tabs>
                        </Box>

                        <TabPanel value={tabValue} index={0}>
                            <Map center={{ lat: 55.604890000000005, lng: 8.97171 }}>
                                <MouseControl pan={true} wheel={true} zoom={true} />
                                <KeyboardControl />
                                <SyncControl />
                                <ZoomControl />
                            </Map>
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            <Box>
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
                            </Box>
                        </TabPanel>
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
