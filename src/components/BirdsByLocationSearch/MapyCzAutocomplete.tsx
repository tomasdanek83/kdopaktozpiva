import { Autocomplete, Button, Stack, TextField } from '@mui/material'
import { useSnackbar } from 'notistack-v5'
import React, { ReactElement, useEffect, useState } from 'react'
import { useGeolocation } from 'rooks'
import { useMapyCzSearchApi } from '../../hooks/useMapyCzSearchApi'

export type MapyCzLocation = {
    id: string
    name: string
    description: string
    lat: number
    lng: number
}

export type MapyCzAutocompleteProps = {
    onLocationSelected: (location: MapyCzLocation) => void
}

export default function MapyCzAutocomplete ({
    onLocationSelected
}: MapyCzAutocompleteProps): ReactElement {
    const [value, setValue] = useState<MapyCzLocation | null>(null)
    const [inputValue, setInputValue] = useState('')
    const [options, setOptions] = React.useState<MapyCzLocation[]>([])
    const [geoLocationEnabled, setGeoLocationEnabled] = useState(false)

    const { search } = useMapyCzSearchApi()
    const { enqueueSnackbar } = useSnackbar()

    const geoObj = useGeolocation({ when: geoLocationEnabled })

    const handleLocationSelected = (location: MapyCzLocation | null): void => {
        setOptions(location != null ? [location] : [])
        setValue(location)

        if (location != null) {
            onLocationSelected(location)
        }
    }

    const toggleGeolocation = (): void => {
        setGeoLocationEnabled(true)
    }

    useEffect(() => {
        search(inputValue).then(result => {
            const locations =
                result.result.map(ri => {
                    return {
                        id: ri.userData.id,
                        name: ri.userData.suggestFirstRow,
                        description: ri.userData.suggestSecondRow,
                        lat: parseFloat(ri.userData.latitude),
                        lng: parseFloat(ri.userData.longitude)
                    }
                })

            console.log('MapyCz search result', locations)

            setOptions(locations)
        }).catch(error => {
            console.error('MapyCz search failed', error)
            enqueueSnackbar('Failed to find birds by location', { variant: 'error' })
        })
    }, [inputValue])

    useEffect(() => {
        console.log('getObj', geoObj)
        if (geoObj == null) {
            return
        }

        if (geoObj.isError || geoObj.lat == null || geoObj.lng == null) {
            enqueueSnackbar(`Failed to enable geolocation: ${geoObj.message}`, { variant: 'error' })
            return
        }

        handleLocationSelected({
            id: 'geolocation',
            name: 'Moje poloha',
            description: '',
            lat: geoObj.lat,
            lng: geoObj.lng
        })
    }, [geoObj])

    return (
        <>
            <Autocomplete
                options={options}
                getOptionLabel={(option: MapyCzLocation) => option.name}
                value={value}
                filterOptions={(x) => x}
                onChange={(event: any, newValue: MapyCzLocation | null) => {
                    handleLocationSelected(newValue)
                }}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue)
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Název lokality/adresa"
                    />
                )}
                renderOption={(props, option) => {
                    return (
                        <li {...props} key={option.id}>
                            <Stack spacing={2}>
                                <div><strong>{option.name}</strong></div>
                                <div>{option.description}</div>
                            </Stack>
                        </li>
                    )
                }}
            />
            <Button onClick={toggleGeolocation}>Použít mojí aktuální polohu</Button>
        </>
    )
}
