import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { ReactElement, useState } from 'react'
import { BirdsByLocationFilters } from '../../api/BirdsByLocationFilters.model'

export type BirdsByLocationSearchFormProps = {
    defaultValues: BirdsByLocationFilters
    onSearch: (filters: BirdsByLocationFilters) => void
}

export default function BirdsByLocationSearchForm ({
    defaultValues,
    onSearch
}: BirdsByLocationSearchFormProps): ReactElement {
    const [lat, setLat] = useState<number>(defaultValues.lat)
    const [lng, setLng] = useState<number>(defaultValues.lng)
    const [radius, setRadius] = useState<number>(defaultValues.radius)
    const [timerange, setTimerange] = useState<number>(defaultValues.timerange)

    const handleLatChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setLat(Number(event.target.value))
    }

    const handleLngChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setLng(Number(event.target.value))
    }

    const handleRadiusChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setRadius(Number(event.target.value))
    }

    const handleTimerangeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setTimerange(Number(event.target.value))
    }

    const isValid = (): boolean => {
        return lat != null && lng != null && radius != null && timerange != null
    }

    const handleSubmit = (): void => {
        console.log('handleSubmit')
        onSearch({
            lat,
            lng,
            radius,
            timerange
        })
    }

    return (
        <Box sx={{
            padding: '1rem'
        }}>
            <form>
                <Box sx={{
                    marginTop: '1rem'
                }}>
                    <TextField
                        label="Šířka"
                        type="number"
                        value={lat}
                        variant="outlined"
                        onChange={handleLatChange} />
                </Box>

                <Box sx={{
                    marginTop: '1rem'
                }}>
                    <TextField
                        label="Délka"
                        type="number"
                        value={lng}
                        variant="outlined"
                        onChange={handleLngChange} />
                </Box>

                <Box sx={{
                    marginTop: '1rem'
                }}>
                    <TextField
                        label="Poloměr (0-50)"
                        type="number"
                        value={radius}
                        variant="outlined"
                        onChange={handleRadiusChange} />
                </Box>

                <Box sx={{
                    marginTop: '1rem'
                }}>
                    <TextField
                        label="Stáří (počet měsíců 1-60)"
                        type="number"
                        value={timerange}
                        variant="outlined"
                        onChange={handleTimerangeChange} />
                </Box>

                <Box sx={{
                    marginTop: '1rem'
                }}>
                    <Button
                        type="button"
                        disabled={!isValid()}
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}>Vyhledat</Button>
                </Box>
            </form>
        </Box>
    )
}
