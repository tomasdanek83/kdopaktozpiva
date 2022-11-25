import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material'
import React, { ReactElement, useState } from 'react'
import { BirdsByLocationFilters } from '../../api/BirdsByLocationFilters.model'
import MapyCzAutocomplete, { MapyCzLocation } from './MapyCzAutocomplete'

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
    const [monthFrom, setMonthFrom] = useState<number>(defaultValues.monthFrom)
    const [monthTo, setMonthTo] = useState<number>(defaultValues.monthTo)

    const handleLocationSelected = (location: MapyCzLocation): void => {
        setLat(location.lat)
        setLng(location.lng)
    }

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

    const handleMonthFromChange = (event: SelectChangeEvent<number | undefined>): void => {
        setMonthFrom(event.target.value as number)
    }

    const handleMonthToChange = (event: SelectChangeEvent<number | undefined>): void => {
        setMonthTo(event.target.value as number)
    }

    const isValid = (): boolean => {
        return lat != null &&
            lng != null &&
            radius != null &&
            timerange != null &&
            ((monthFrom === 0 && monthTo === 0) || (monthFrom > 0 && monthTo > 0))
    }

    const handleSubmit = (): void => {
        console.log('handleSubmit')
        onSearch({
            lat,
            lng,
            radius,
            timerange,
            monthFrom,
            monthTo
        })
    }

    return (
        <form>
            <Stack spacing={2}>
                <MapyCzAutocomplete onLocationSelected={handleLocationSelected}></MapyCzAutocomplete>

                <TextField
                    label="Zeměpisná šířka"
                    type="number"
                    value={lat}
                    variant="outlined"
                    onChange={handleLatChange} />

                <TextField
                    label="Zeměpisná délka"
                    type="number"
                    value={lng}
                    variant="outlined"
                    onChange={handleLngChange} />

                <TextField
                    label="Poloměr (0-50) km"
                    type="number"
                    value={radius}
                    variant="outlined"
                    onChange={handleRadiusChange} />

                <TextField
                    label="Stáří záznamů (počet měsíců 1-60)"
                    type="number"
                    value={timerange}
                    variant="outlined"
                    onChange={handleTimerangeChange} />

                <FormControl variant="outlined" sx={{ marginTop: '1rem' }}>
                    <InputLabel id="monthFrom-label">Období roku - začátek</InputLabel>
                    <Select
                        labelId="monthFrom-label"
                        value={monthFrom}
                        onChange={handleMonthFromChange}
                        label="Období roku - začátek">
                        <MenuItem value={0}>Všechny</MenuItem>
                        <MenuItem value={1}>Leden</MenuItem>
                        <MenuItem value={2}>Únor</MenuItem>
                        <MenuItem value={3}>Březen</MenuItem>
                        <MenuItem value={4}>Duben</MenuItem>
                        <MenuItem value={5}>Květen</MenuItem>
                        <MenuItem value={6}>Červen</MenuItem>
                        <MenuItem value={7}>Červenec</MenuItem>
                        <MenuItem value={8}>Srpen</MenuItem>
                        <MenuItem value={9}>Září</MenuItem>
                        <MenuItem value={10}>Říjen</MenuItem>
                        <MenuItem value={11}>Listopad</MenuItem>
                        <MenuItem value={12}>Prosinec</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="outlined" sx={{ marginTop: '1rem' }}>
                    <InputLabel id="monthTo-label">Období roku - konec</InputLabel>
                    <Select
                        labelId="monthTo-label"
                        value={monthTo}
                        onChange={handleMonthToChange}
                        label="Období roku - konec">
                        <MenuItem value={0}>Všechny</MenuItem>
                        <MenuItem value={1}>Leden</MenuItem>
                        <MenuItem value={2}>Únor</MenuItem>
                        <MenuItem value={3}>Březen</MenuItem>
                        <MenuItem value={4}>Duben</MenuItem>
                        <MenuItem value={5}>Květen</MenuItem>
                        <MenuItem value={6}>Červen</MenuItem>
                        <MenuItem value={7}>Červenec</MenuItem>
                        <MenuItem value={8}>Srpen</MenuItem>
                        <MenuItem value={9}>Září</MenuItem>
                        <MenuItem value={10}>Říjen</MenuItem>
                        <MenuItem value={11}>Listopad</MenuItem>
                        <MenuItem value={12}>Prosinec</MenuItem>
                    </Select>
                </FormControl>

                <Button
                    type="button"
                    disabled={!isValid()}
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}>Zobrazit druhy</Button>
            </Stack>
        </form>
    )
}
