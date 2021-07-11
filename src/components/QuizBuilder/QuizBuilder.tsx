import React, { ReactElement, useState, useEffect } from 'react'
import { QuizParams } from '../../model/QuizParams.model'
import { Bird } from '../../model/Bird.model'
import { Typography, Button, TextField, createStyles, makeStyles, Theme, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useBirdsApi } from '../../hooks/useBirdsApi'
import { AutocompleteChangeReason, AutocompleteChangeDetails } from '@material-ui/lab'
import { SoundType } from '../../api/SoundType.model'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formField: {
            marginTop: '1rem'
        }
    })
)

export type QuizBuilderProps = {
    onBuild: (params: QuizParams) => void
}

export default function QuizBuilder ({ onBuild }: QuizBuilderProps): ReactElement {
    const [birds, setBirds] = useState<Bird[]>([])
    const [allBirds, setAllBirds] = useState<Bird[]>([])
    const [questionCount, setQuestionCount] = useState<number>(10)
    const [soundType, setSoundType] = useState<SoundType>('all')

    const { getAllBirds } = useBirdsApi()

    const classes = useStyles()

    useEffect(() => {
        setAllBirds(getAllBirds())
    }, [])

    const handleQuestionCountChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setQuestionCount(Number(event.target.value))
    }

    const handleBirdsChange = (
        event: React.ChangeEvent<{}>,
        value: any,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<Bird>): void => {
        setBirds(value)
    }

    const handleSoundTypeChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
        setSoundType(event.target.value as SoundType)
    }

    const handleSubmit = (): void => {
        onBuild({
            birds: birds,
            questionCount: questionCount,
            type: soundType
        })
    }

    return (<>
        <Typography variant="h5">
            Vytvořit kvíz
        </Typography>

        <form onSubmit={handleSubmit}>
            <div className={classes.formField}>
                <TextField
                    label="Počet otázek"
                    type="number"
                    value={questionCount}
                    variant="outlined"
                    onChange={handleQuestionCountChange} />
            </div>

            <div className={classes.formField}>
                <Autocomplete
                    multiple
                    id="tags-standard"
                    options={allBirds}
                    getOptionLabel={(option: Bird) => option.czechName}
                    value={birds}
                    onChange={handleBirdsChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Ptačí druhy"
                        />
                    )}
                />
            </div>

            <FormControl variant="outlined" className={classes.formField}>
                <InputLabel id="sound-type-label">Typ zvuku</InputLabel>
                <Select
                    labelId="sound-type-label"
                    value={soundType}
                    onChange={handleSoundTypeChange}
                    label="Typ zvuku">
                    <MenuItem value={'all'}>Všechny zvuky</MenuItem>
                    <MenuItem value={'song'}>Pouze zpěv</MenuItem>
                    <MenuItem value={'call'}>Pouze volání</MenuItem>
                </Select>
            </FormControl>

            <div className={classes.formField}>
                <Button
                    type="submit"
                    disabled={birds.length < 2}
                    variant="contained"
                    color="primary">Vytvořit</Button>
            </div>
        </form>
    </>)
}
