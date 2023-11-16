import {t} from '@lingui/macro'
import {IconButton, Stack, styled} from '@mui/material'
import {FocusEventHandler, forwardRef, MouseEventHandler, MutableRefObject, useImperativeHandle, useRef} from 'react'
import {Controller, useFormContext} from 'react-hook-form'
import {Exchange} from 'src/assets/icons'
import {TextInput} from 'src/shared/input'
import {InputProps} from '../FlightPage'

const ChangePathButton = styled(IconButton)(({theme}) => ({
  '&': {
    padding: theme.spacing(1),
    position: 'absolute',
    top: theme.spacing(4),
    right: theme.spacing(3),
    background: theme.palette.background.paper,
    border: `1px solid ${theme.palette.grey[700]}`,
  },
  '&:hover': {
    background: theme.palette.background.paper,
  },
}))

const TextInputForSrcCity = styled(TextInput)(({theme}) => ({
  ...theme.typography.caption,

  '&>.MuiInputBase-input': {
    borderBottomLeftRadius: '0 !important',
    borderBottomRightRadius: '0 !important',
    backgroundColor: `${theme.palette.shades[2]} !important`,
    cursor: 'pointer',
    border: `1px solid ${theme.palette.shades[4]}`,
  },
  '&': {marginTop: '0 !important'},
}))

const TextInputForDestCity = styled(TextInput)(({theme}) => ({
  ...theme.typography.caption,
  '&>.MuiInputBase-input': {
    borderTopLeftRadius: '0 !important',
    borderTopRightRadius: '0 !important',
    backgroundColor: `${theme.palette.shades[2]} !important`,
    cursor: 'pointer',
    border: `1px solid ${theme.palette.shades[4]}`,
  },
  '&': {marginTop: '0 !important'},
}))

interface SearchInputsProps {
  onClickInput?: FocusEventHandler<HTMLInputElement> & MouseEventHandler<HTMLInputElement> & MouseEventHandler<HTMLDivElement>
  justClickMode?: boolean
}

export const SearchInputs = forwardRef<
  {srcInput?: MutableRefObject<HTMLInputElement | undefined>; destInput?: MutableRefObject<HTMLInputElement | undefined>},
  SearchInputsProps
>(({onClickInput, justClickMode}, ref) => {
  const {control, getValues, setValue} = useFormContext<InputProps>()
  const reversePath = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    const src = getValues().srcCity
    const dest = getValues().destCity
    setValue('destCity', src)
    setValue('srcCity', dest)
  }
  const srcInputRef = useRef<HTMLInputElement>()
  const destInputRef = useRef<HTMLInputElement>()
  useImperativeHandle(ref, () => ({
    srcInput: srcInputRef,
    destInput: destInputRef,
  }))

  return (
    <Stack id={'test'} sx={{position: 'relative'}} onClick={justClickMode ? onClickInput : undefined}>
      <Controller
        name="srcCity.label"
        control={control}
        rules={{
          required: true,
        }}
        render={({fieldState, field}) => (
          <TextInputForSrcCity
            formControlProps={{sx: {paddingBottom: 0}}}
            autoFocus
            state={fieldState}
            inputProps={{readOnly: justClickMode}}
            fullWidth
            onClick={justClickMode ? undefined : onClickInput}
            onFocus={justClickMode ? undefined : onClickInput}
            placeholder={t`Source city`}
            {...field}
            ref={(current) => {
              field.ref(current)
              srcInputRef.current = current || undefined
            }}
          />
        )}
      />
      <Controller
        name="destCity.label"
        control={control}
        rules={{
          required: true,
        }}
        render={({fieldState, field}) => (
          <TextInputForDestCity
            formControlProps={{sx: {paddingTop: 0}}}
            state={fieldState}
            inputProps={{readOnly: justClickMode}}
            onClick={justClickMode ? undefined : onClickInput}
            onFocus={justClickMode ? undefined : onClickInput}
            fullWidth
            placeholder={t`Destination city`}
            {...field}
            ref={(current) => {
              field.ref(current)
              destInputRef.current = current || undefined
            }}
          />
        )}
      />
      <ChangePathButton onClick={reversePath}>
        <Exchange width="18px" height="18px" />
      </ChangePathButton>
    </Stack>
  )
})
