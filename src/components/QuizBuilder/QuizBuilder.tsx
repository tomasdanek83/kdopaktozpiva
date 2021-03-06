import React, { ReactElement, useState, useEffect } from 'react'
import { QuizParams } from '../../model/QuizParams.model'
import { Bird } from '../../model/Bird.model'
import { Typography, Button, TextField, createStyles, makeStyles, Theme, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useBirdsApi } from '../../hooks/useBirdsApi'
import { AutocompleteChangeReason, AutocompleteChangeDetails } from '@material-ui/lab'
import { SoundType } from '../../api/SoundType.model'
import { QuizMode } from '../../model/QuizMode.model'
import { RecordingQualityLevel } from '../../model/RecordingQualityLevel.model'

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

    const { getAllCzechBirds } = useBirdsApi()

    const classes = useStyles()

    useEffect(() => {
        setAllBirds(getAllCzechBirds())
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
            Vytvo??it kv??z
        </Typography>

        <form onSubmit={handleSubmit}>
            <div className={classes.formField}>
                <TextField
                    label="Po??et ot??zek"
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
                            label="Pta???? druhy (minim??ln?? 2)"
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
                        <MenuItem value={'all'}>V??echny zvuky</MenuItem>
                        <MenuItem value={'song'}>Pouze zp??v</MenuItem>
                        <MenuItem value={'call'}>Pouze vol??n??</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div className={classes.formField}>
                <FormControl variant="outlined" className={classes.formField}>
                    <InputLabel id="quality-label">Kvalita nahr??vek</InputLabel>
                    <Select
                        labelId="quality-label"
                        value={quality}
                        onChange={handleQualityChange}
                        label="Kvalita nahr??vek">
                        <MenuItem value={'high'}>Pouze kvalitn?? nahr??vky</MenuItem>
                        <MenuItem value={'all'}>V??echny nahr??vky</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div className={classes.formField}>
                <FormControl variant="outlined" className={classes.formField}>
                    <InputLabel id="quiz-mode-label">Re??im kv??zu</InputLabel>
                    <Select
                        labelId="quiz-mode-label"
                        value={quizMode}
                        onChange={handleQuizModeChange}
                        label="Re??im kv??zu">
                        <MenuItem value={'education'}>V??ukov?? (v??ce pokus?? na ka??dou ot??zku)</MenuItem>
                        <MenuItem value={'competition'}>Sout????n?? (jeden pokus na ka??dou ot??zku )</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div className={classes.formField}>
                <Button
                    type="submit"
                    disabled={birds.length < 2}
                    variant="contained"
                    color="primary">Vytvo??it</Button>
            </div>
        </form>
    </>)
}
