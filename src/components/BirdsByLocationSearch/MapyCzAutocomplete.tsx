import { Autocomplete, Stack, TextField } from '@mui/material'
import { useSnackbar } from 'notistack-v5'
import React, { ReactElement, useState } from 'react'
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

    const { search } = useMapyCzSearchApi()
    const { enqueueSnackbar } = useSnackbar()

    const handleLocationSelected = (location: MapyCzLocation | null): void => {
        setOptions(location != null ? [location] : [])
        setValue(location)

        if (location != null) {
            onLocationSelected(location)
        }
    }

    React.useEffect(() => {
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
            enqueueSnackbar('Failed to birds by location', { variant: 'error' })
        })
    }, [inputValue])

    return (
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
    )
}
