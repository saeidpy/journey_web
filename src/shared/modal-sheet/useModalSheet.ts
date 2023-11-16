import {useAtom} from 'jotai'
import {modalAtom} from 'src/atoms'
import {ModalContextType, OpenModalProps} from './ModalSheetProvider'
/**
 * A hook for opening a modal sheet wherever you want.
 * @example
 *  const { openModal, closeModal, closeAllModals } = useModalSheet();
 *  openModal('test-id', {
 *    content: <HomepageHeader />,
 *    title: 'title-test',
 *    actionHeaderEl: <div>more 3</div>,
 *  });
 *  closeModal('test-id');
 *
 * @returns {Omit<ModalContextType, 'modals'> }
 */
export const useModalSheet = (): Omit<ModalContextType, 'modals'> => {
  const [, setModal] = useAtom(modalAtom)

  const openModal = (id: string, options: OpenModalProps) => {
    window.history.pushState({modalId: id}, '', window.location.href)
    setModal({id, options})
  }

  const closeModal = () => {
    if (window.history.state['modalId']) {
      window.history.back()
    }
    setModal(undefined)
  }

  return {openModal, closeModal}
}
