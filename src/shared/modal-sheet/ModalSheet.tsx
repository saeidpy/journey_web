import {styled, useTheme} from '@mui/material'
import {useLayoutEffect} from 'react'
import {OverlayProvider} from 'react-aria'
import Sheet from 'react-modal-sheet'
import {mobileUI} from 'src/shared/constants'
import {Modal} from './Modal'
import {ModalType} from './ModalSheetProvider'

const WrapperSheet = styled(Sheet)(({theme}) => ({
  margin: '0 auto',
  zIndex: '1000 !important',
  maxWidth: mobileUI.shared.maxWidth,
  '& .react-modal-sheet-container': {
    borderRadius: theme.spacing(3, 3, 0, 0) + ' !important',
  },
}))
export const ModalSheet = ({modal, closeModal}: {modal: ModalType; closeModal: () => void}) => {
  const theme = useTheme()

  useLayoutEffect(() => {
    const popstate = () => {
      closeModal()
    }
    window.addEventListener('popstate', popstate)
    return () => {
      window.removeEventListener('popstate', popstate)
    }
  }, [modal.id, closeModal])

  return (
    <WrapperSheet disableDrag prefersReducedMotion dir={theme.direction} key={modal.id} detent="content-height" isOpen onClose={closeModal}>
      <OverlayProvider>
        <Modal key={modal.id} modal={modal} closeModal={closeModal} />
      </OverlayProvider>
    </WrapperSheet>
  )
}
