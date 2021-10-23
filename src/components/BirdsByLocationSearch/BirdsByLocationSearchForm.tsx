import { Button, createStyles, makeStyles, TextField, Theme } from '@material-ui/core'
import React, { ReactElement, useState } from 'react'
import { BirdsByLocationFilters } from '../../api/BirdsByLocationFilters.model'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '1rem'
        },
        formField: {
            marginTop: '1rem'
        }
    })
)

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

    const classes = useStyles()

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

    return (<div className={classes.root}>
        <form>
            <div className={classes.formField}>
                <TextField
                    label="Šířka"
                    type="number"
                    value={lat}
                    variant="outlined"
                    onChange={handleLatChange} />
            </div>

            <div className={classes.formField}>
                <TextField
                    label="Délka"
                    type="number"
                    value={lng}
                    variant="outlined"
                    onChange={handleLngChange} />
            </div>

            <div className={classes.formField}>
                <TextField
                    label="Poloměr"
                    type="number"
                    value={radius}
                    variant="outlined"
                    onChange={handleRadiusChange} />
            </div>

            <div className={classes.formField}>
                <TextField
                    label="Stáří (počet měsíců)"
                    type="number"
                    value={timerange}
                    variant="outlined"
                    onChange={handleTimerangeChange} />
            </div>

            <div className={classes.formField}>
                <Button
                    type="button"
                    disabled={!isValid()}
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}>Vyhledat</Button>
            </div>
        </form>
    </div>)
}
