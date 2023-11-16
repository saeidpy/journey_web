import {t} from '@lingui/macro'
import {Dialog as MuiDialog, DialogActions, DialogContent as MuiDialogContent, List, Slide, Stack, styled} from '@mui/material'
import {TransitionProps} from '@mui/material/transitions'
import {useMutation} from '@tanstack/react-query'
import {forwardRef, MutableRefObject, useEffect, useRef} from 'react'
import {useFormContext} from 'react-hook-form'
import {mobileUI} from 'src/shared/constants'
import {Header} from 'src/shared/layouts/app-layout'
import {Spinner} from 'src/shared/loading'
import {HotelOrCityType} from 'src/shared/types/server'
import {HotelInputType} from '../HotelPage'
import {HotelSearchInput} from './HotelSearchInput'
import {SearchHotelHistory} from './SearchHotelHistory'
import {searchHotelOrDestinationMutation} from './searchHotelOrDestination.mutation'

type CitySearchProps = {open: boolean; handleClose: () => void}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />
})

const DialogContent = styled(MuiDialogContent)({
  padding: 0,
})

const Dialog = styled(MuiDialog)({
  maxWidth: mobileUI.shared.maxWidth,
  margin: 'auto',
})

export const SearchHotelDialog = ({open, handleClose}: CitySearchProps) => {
  const {data, isSuccess, isLoading, mutateAsync} = useMutation(searchHotelOrDestinationMutation)
  const {watch, setValue} = useFormContext<HotelInputType>()

  const destinationInput = watch('destination.label')
  const destinationValue = watch('destination.value')
  const prevDestinationInput = useRef(destinationInput)
  const prevDestinationValue = useRef(destinationValue)

  const inputsRef = useRef<{
    destination?: MutableRefObject<HTMLInputElement | undefined>
  }>({})

  useEffect(() => {
    let abortController: AbortController
    const searchTerm = destinationInput
    const searchValue = destinationValue
    const prevSearchTerm = prevDestinationInput
    const prevSearchValue = prevDestinationValue
    if (searchTerm !== prevSearchTerm.current && searchValue === prevSearchValue.current) {
      setValue('destination', {label: searchTerm, value: null, type: HotelOrCityType.hotel})
      if (searchTerm.length > 0) {
        abortController = new AbortController()
        mutateAsync({searchTerm, signal: abortController.signal}).then((res) => {
          if (res?.[0]?.result_text && res[0].result_text === res[0].search_text) {
            setValue('destination', {label: res[0].result_text, value: res[0].id, type: res?.[0].entity_type})
          }
        })
      }
    }
    prevSearchTerm.current = searchTerm
    prevSearchValue.current = searchValue
    return () => {
      if (abortController && !abortController.signal.aborted) {
        abortController.abort()
      }
    }
  }, [destinationInput, mutateAsync, setValue, destinationValue])

  useEffect(() => {
    inputsRef.current.destination?.current?.focus()
  }, [inputsRef])

  const onClickResultSearch = (data: HotelInputType['destination']) => {
    setValue('destination', data, {shouldValidate: true})
    handleClose()
  }
  const onClickDeleteHistory = () => {}

  const searchedString = destinationInput
  const showSearch = searchedString && isSuccess && !isLoading && data

  return (
    <Dialog fullScreen open={open} maxWidth="sm" onClose={handleClose} TransitionComponent={Transition} disablePortal>
      <DialogActions>
        <Header hasBackButton backButtonCallback={handleClose} title={t`Hotel or destination city`} />
      </DialogActions>

      <DialogContent>
        <Stack p={3}>
          <HotelSearchInput ref={inputsRef} />
        </Stack>
        <List>
          {isLoading ? (
            <Stack justifyContent="center" alignItems="Center" height={300}>
              <Spinner />
            </Stack>
          ) : (
            <SearchHotelHistory onClick={onClickResultSearch} onDelete={onClickDeleteHistory} list={showSearch ? data : undefined} />
          )}
        </List>
      </DialogContent>
    </Dialog>
  )
}
