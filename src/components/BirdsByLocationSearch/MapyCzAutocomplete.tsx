import { Autocomplete, TextField } from '@mui/material'
import React, { ReactElement, useState } from 'react'

export type MapyCzLocation = {
    name: string
    lat: number
    lng: number
}

export default function MapyCzAutocomplete (): ReactElement {
    const [value, setValue] = useState<MapyCzLocation | null>(null)
    const [inputValue, setInputValue] = useState('')
    const [options, setOptions] = React.useState<MapyCzLocation[]>([])

    const handleLocationSelected = (location: MapyCzLocation | null): void => {
        setOptions(location != null ? [location, ...options] : options)
        setValue(location)
    }

    React.useEffect(() => {
        setOptions([
            {
                name: 'Milíčovský rybník',
                lat: 50.0256036,
                lng: 14.5394797
            },
            {
                name: 'Holásecká jezera',
                lat: 49.1477883,
                lng: 16.6436922
            }
        ])
    }, [inputValue])

    return (
        <Autocomplete
            options={options}
            getOptionLabel={(option: MapyCzLocation) => option.name}
            value={value}
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
        />
    )
}
