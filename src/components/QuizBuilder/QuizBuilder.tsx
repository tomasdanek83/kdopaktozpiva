import React, { ReactElement, useState, useEffect } from 'react'
import { QuizParams } from '../../model/QuizParams.model'
import { Bird } from '../../model/Bird.model'
import { Typography, Button, TextField, createStyles, makeStyles, Theme, FormControl, InputLabel, Select, MenuItem, Modal } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useBirdsApi } from '../../hooks/useBirdsApi'
import { AutocompleteChangeReason, AutocompleteChangeDetails } from '@material-ui/lab'
import { SoundType } from '../../api/SoundType.model'
import { QuizMode } from '../../model/QuizMode.model'
import { RecordingQualityLevel } from '../../model/RecordingQualityLevel.model'
import BirdsByLocationSearch from '../BirdsByLocationSearch/BirdsByLocationSearch'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formField: {
            marginTop: '1rem'
        }
    })
)

export type QuizBuilderProps = {
    initialParams: QuizParams
    onBuild: (params: QuizParams) => void
}

export default function QuizBuilder ({ initialParams, onBuild }: QuizBuilderProps): ReactElement {
    const [birds, setBirds] = useState<Bird[]>(initialParams.birds)
    const [allBirds, setAllBirds] = useState<Bird[]>([])
    const [questionCount, setQuestionCount] = useState<number>(initialParams.questionCount)
    const [soundType, setSoundType] = useState<SoundType>('all')
    const [quizMode, setQuizMode] = useState<QuizMode>('education')
    const [quality, setQuality] = useState<RecordingQualityLevel>('high')
    const [birdsByLocationSearchOpened, setBirdsByLocationSearchOpened] = useState<boolean>(false)

    const { getAllCzechBirds } = useBirdsApi()

    const classes = useStyles()

    useEffect(() => {
        setAllBirds(getAllCzechBirds())
    }, [])

    const handleQuestionCountChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setQuestionCount(Number(event.target.value))
    }

    const toggleBirdsByLocationSearch = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return
        }

        setBirdsByLocationSearchOpened(open)
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

    const handleQuizModeChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
        setQuizMode(event.target.value as QuizMode)
    }

    const handleQualityChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
        setQuality(event.target.value as RecordingQualityLevel)
    }

    const handleSubmit = (): void => {
        onBuild({
            birds: birds,
            questionCount: questionCount,
            type: soundType,
            mode: quizMode,
            quality: quality
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
                <Modal
                    open={birdsByLocationSearchOpened}
                    onClose={toggleBirdsByLocationSearch(false)}>
                    <BirdsByLocationSearch></BirdsByLocationSearch>
                </Modal>
                <Button onClick={toggleBirdsByLocationSearch(true)}>Přidat druhy podle lokality</Button>

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
                            label="Ptačí druhy (minimálně 2)"
                        />
                    )}
                />
            </div>

            <div className={classes.formField}>
                <FormControl variant="outlined">
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
            </div>

            <div className={classes.formField}>
                <FormControl variant="outlined" className={classes.formField}>
                    <InputLabel id="quality-label">Kvalita nahrávek</InputLabel>
                    <Select
                        labelId="quality-label"
                        value={quality}
                        onChange={handleQualityChange}
                        label="Kvalita nahrávek">
                        <MenuItem value={'high'}>Pouze kvalitní nahrávky (A,B,C)</MenuItem>
                        <MenuItem value={'all'}>Všechny nahrávky (A,B,C,D,E)</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div className={classes.formField}>
                <FormControl variant="outlined" className={classes.formField}>
                    <InputLabel id="quiz-mode-label">Režim kvízu</InputLabel>
                    <Select
                        labelId="quiz-mode-label"
                        value={quizMode}
                        onChange={handleQuizModeChange}
                        label="Režim kvízu">
                        <MenuItem value={'education'}>Výukový (více pokusů na každou otázku)</MenuItem>
                        <MenuItem value={'competition'}>Soutěžní (jeden pokus na každou otázku )</MenuItem>
                    </Select>
                </FormControl>
            </div>

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
