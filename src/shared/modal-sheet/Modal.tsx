import {styled} from '@mui/material'
import {useRef} from 'react'
import {useDialog, useOverlay} from 'react-aria'
import Sheet from 'react-modal-sheet'
import {shouldForwardProp} from 'src/shared/utils/shouldForwardProp'
import {Header} from './Header'
import {ModalContextType, ModalType} from './ModalSheetProvider'

const ContentSheet = styled(Sheet.Content, {shouldForwardProp})<{zeroPadding?: boolean}>(({zeroPadding, theme}) => ({
  padding: zeroPadding ? 0 : theme.spacing(3, 2),
}))

interface ModalProps extends Pick<ModalContextType, 'closeModal'> {
  modal: ModalType
}

export const Modal = ({modal, closeModal}: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const dialog = useDialog({}, ref)
  const overlay = useOverlay(
    {
      onClose: closeModal,
      isOpen: true,
      isDismissable: true,
      shouldCloseOnInteractOutside: (element) => {
        if (element.className.includes('MuiBackdrop-root')) return false
        if (element.ariaLabel !== 'select-item') return true
        return false
      },
    },
    ref
  )

  return (
    <>
      <Sheet.Container {...overlay.overlayProps} {...(dialog.dialogProps as any)} ref={ref} tabIndex="">
        <Sheet.Header>
          <Header onClose={closeModal} title={modal.options.title} actionHeader={modal.options?.actionHeaderEl} />
        </Sheet.Header>
        <ContentSheet zeroPadding={modal.options?.zeroPadding}>{modal.options.content}</ContentSheet>
      </Sheet.Container>
      <Sheet.Backdrop />
    </>
  )
}
