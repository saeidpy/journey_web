import {t} from '@lingui/macro'
import {Dialog as MuiDialog, DialogActions, DialogContent as MuiDialogContent, List, Slide, Stack, styled} from '@mui/material'
import {TransitionProps} from '@mui/material/transitions'
import {useMutation} from '@tanstack/react-query'
import {FocusEventHandler, forwardRef, MouseEventHandler, MutableRefObject, useEffect, useRef, useState} from 'react'
import {useFormContext} from 'react-hook-form'
import {InputProps} from 'src/pages/flight/FlightPage'
import {SearchInputs} from 'src/pages/flight/search-inputs/SearchInputs'
import {mobileUI} from 'src/shared/constants'
import {Header} from 'src/shared/layouts/app-layout'
import {Spinner} from 'src/shared/loading'
import {searchCityMutation} from './searchCity.mutation'
import {SearchCityHistory} from './SearchCityHistory'

type CitySearchProps = {open: boolean; handleClose: () => void}
type InputType = keyof Pick<InputProps, 'srcCity' | 'destCity'>

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

export const SearchCityDialog = ({open, handleClose}: CitySearchProps) => {
  const {data, isSuccess, isLoading, mutateAsync} = useMutation(searchCityMutation)
  const [inputType, setInputType] = useState<InputType>('srcCity')
  const {watch, setValue} = useFormContext<InputProps>()

  const srcCityInput = watch('srcCity.label')
  const srcCityValue = watch('srcCity.value')
  const destCityInput = watch('destCity.label')
  const destCityValue = watch('destCity.value')
  const prevInputType = useRef(inputType)
  const prevSrcCityInput = useRef(srcCityInput)
  const prevDestCityInput = useRef(destCityInput)
  const prevSrcCityValue = useRef(srcCityValue)
  const prevDestCityValue = useRef(destCityValue)
  const inputsRef = useRef<{
    srcInput?: MutableRefObject<HTMLInputElement | undefined>
    destInput?: MutableRefObject<HTMLInputElement | undefined>
  }>({})

  useEffect(() => {
    let abortController: AbortController
    const isSrc = prevInputType.current === 'srcCity'
    const searchTerm = isSrc ? srcCityInput : destCityInput
    const searchValue = isSrc ? srcCityValue : destCityValue
    const prevSearchTerm = isSrc ? prevSrcCityInput : prevDestCityInput
    const prevSearchValue = isSrc ? prevSrcCityValue : prevDestCityValue
    if (searchTerm !== prevSearchTerm.current && searchValue === prevSearchValue.current) {
      setValue(prevInputType.current, {label: searchTerm, value: null})
      if (searchTerm.length > 0) {
        abortController = new AbortController()
        mutateAsync({searchTerm, signal: abortController.signal}).then((res) => {
          if (res?.[0]?.result_text && res[0].result_text === res[0].search_text) {
            setValue(prevInputType.current, {label: res[0].result_text, value: res[0].id})
          }
        })
      }
    }
    prevInputType.current = inputType
    prevSearchTerm.current = searchTerm
    prevSearchValue.current = searchValue
    return () => {
      if (abortController && !abortController.signal.aborted) {
        abortController.abort()
      }
    }
  }, [srcCityInput, destCityInput, mutateAsync, inputType, setValue, destCityValue, srcCityValue])

  useEffect(() => {
    if (inputType === 'srcCity') {
      inputsRef.current.srcInput?.current?.focus()
    } else {
      inputsRef.current.destInput?.current?.focus()
    }
  }, [inputType])

  const onClickInput: FocusEventHandler<HTMLInputElement> & MouseEventHandler<HTMLInputElement> & MouseEventHandler<HTMLDivElement> = (
    e
  ) => {
    const name = (e.target as HTMLInputElement)['name']
    setInputType(name.substring(0, name.length - 6) as InputType)
  }
  const onClickResultSearch = (data: {label: string; value: string}) => {
    setValue(inputType, data)
    if (inputType === 'srcCity' && !destCityValue) {
      setInputType('destCity')
    } else if (inputType === 'destCity' && !srcCityValue) {
      setInputType('srcCity')
    } else {
      handleClose()
    }
  }
  const onClickDeleteHistory = () => {}

  const searchedString = inputType === 'srcCity' ? srcCityInput : destCityInput
  const showSearch = searchedString && isSuccess && !isLoading && data

  return (
    <Dialog fullScreen open={open} maxWidth="sm" onClose={handleClose} TransitionComponent={Transition} disablePortal>
      <DialogActions>
        <Header
          hasBackButton
          backButtonCallback={handleClose}
          title={inputType === 'destCity' ? t`Select destination` : t`Select origin`}
        />
      </DialogActions>
      <DialogContent>
        <Stack p={3}>
          <SearchInputs onClickInput={onClickInput} ref={inputsRef} />
        </Stack>
        <List>
          {isLoading ? (
            <Stack justifyContent="center" alignItems="Center" height={300}>
              <Spinner />
            </Stack>
          ) : (
            <SearchCityHistory onClick={onClickResultSearch} onDelete={onClickDeleteHistory} list={showSearch ? data : undefined} />
          )}
        </List>
      </DialogContent>
    </Dialog>
  )
}
