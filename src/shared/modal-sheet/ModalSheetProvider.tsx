import {useAtom} from 'jotai'
import React, {useCallback} from 'react'
import {modalAtom} from 'src/atoms'
import {useHandleBack} from '../layouts/app-layout'
import {ModalSheet} from './ModalSheet'
export interface OpenModalProps {
  content: React.ReactNode
  title: string
  actionHeaderEl?: React.ReactNode
  zeroPadding?: boolean
}

export interface ModalObject {
  [id: string]: OpenModalProps
}

export interface ModalType {
  id: string
  options: OpenModalProps
}

interface ModalProviderProps {
  children: React.ReactNode
}
export interface ModalContextType {
  openModal: (id: string, options: OpenModalProps) => void
  closeModal: () => void
}

export const ModalSheetProvider = ({children}: ModalProviderProps) => {
  const [modal, setModal] = useAtom(modalAtom)
  const backButton = useHandleBack()

  const openModal = useCallback(
    (id: string, options: OpenModalProps) => {
      window.history.pushState({modalId: id}, '', window.location.href)
      setModal({options, id})
    },
    [setModal]
  )

  const closeModal = useCallback(() => {
    if (window.history.state['modalId']) {
      backButton()
    }
    setModal(undefined)
  }, [backButton, setModal])

  return (
    <>
      {modal && <ModalSheet modal={modal} closeModal={closeModal} />}
      {children}
    </>
  )
}

export const useModalSheet = (): Omit<ModalContextType, 'modals'> => {
  const [, setModal] = useAtom(modalAtom)

  const openModal = useCallback(
    (id: string, options: OpenModalProps) => {
      window.history.pushState({modalId: id}, '', window.location.href)
      setModal({options, id})
    },
    [setModal]
  )

  const closeModal = useCallback(() => {
    if (window.history.state['modalId']) {
      window.history.back()
    }
    setModal(undefined)
  }, [setModal])

  return {openModal, closeModal}
}
