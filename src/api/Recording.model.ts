import { RecordingQuality } from './RecordingQuality.model'
import { Sono } from './Sono.model'

/**
 * https://www.xeno-canto.org/explore/api
 */
export type Recording = {
    /** the catalogue number of the recording on xeno-canto */
    id: number

    /**  the generic name of the species */
    gen: string

    /**  the specific name (epithet) of the species */
    sp: string

    /** the subspecies name (subspecific epithet) */
    ssp: string

    /**  the English name of the species */
    en: string

    /** the name of the recordist */
    rec: string

    /** the country where the recording was made */
    cnt: string

    /**  the name of the locality */
    loc: string

    /** the latitude of the recording in decimal coordinates */
    lat: number

    /** the longitude of the recording in decimal coordinates */
    lng: number

    alt: number

    /** the sound type of the recording (e.g. 'call', 'song', etc). This is generally a comma-separated list of sound types. */
    type: string

    /**  the URL specifying the details of this recording */
    url: string

    /** the URL to the audio file */
    file: string

    /**  the original file name of the audio file */
    'file-name': string

    /** an object with the urls to the four versions of sonograms */
    sono: Sono

    /**  the URL describing the license of this recording */
    lic: string

    /** the current quality rating for the recording */
    q: RecordingQuality

    /** the length of the recording in minutes */
    length: string

    /** the time of day that the recording was made */
    time: string

    /**  the date that the recording was made */
    date: string

    /**  the date that the recording was uploaded to xeno-canto */
    uploaded: string

    /** an array with the identified background species in the recording */
    also: string[]

    /** additional remarks by the recordist */
    rmk: string

    /** was the recorded bird visually identified? */
    'bird-seen': 'yes' | 'no'

    /** was playback used to lure the bird? (yes/no) */
    'playback-used': 'yes' | 'no'
}
