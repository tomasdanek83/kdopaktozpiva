import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import React, { ReactElement } from 'react'
import { Bird } from '../../model/Bird.model'
import BirdsByLocationSearch from './BirdsByLocationSearch'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    height: '75%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
}

export type BirdsByLocationSearchModalProps = {
    open: boolean
    onBirdsSelected: (selectedBirds: Bird[]) => void
    onClose: () => void
}

export default function BirdsByLocationSearchModal ({
    open,
    onBirdsSelected: onBirdSelected,
    onClose
}: BirdsByLocationSearchModalProps): ReactElement {
    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <BirdsByLocationSearch
                        onConfirm={onBirdSelected}
                        onCancel={onClose}></BirdsByLocationSearch>
                </Box>
            </Modal>
        </div>
    )
}
