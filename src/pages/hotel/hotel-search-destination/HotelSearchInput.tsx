import {t} from '@lingui/macro'
import {Stack} from '@mui/material'
import {FocusEventHandler, forwardRef, MouseEventHandler, MutableRefObject, useImperativeHandle, useRef} from 'react'
import {Controller, useFormContext} from 'react-hook-form'
import {StandardTextField} from 'src/shared/input'
import {HotelInputType} from '../HotelPage'

interface SearchInputsProps {
  onClickInput?: FocusEventHandler<HTMLInputElement> & MouseEventHandler<HTMLInputElement> & MouseEventHandler<HTMLDivElement>
  justClickMode?: boolean
}

export const HotelSearchInput = forwardRef<{destination?: MutableRefObject<HTMLInputElement | undefined>}, SearchInputsProps>(
  ({onClickInput, justClickMode}, ref) => {
    const {control} = useFormContext<HotelInputType>()
    const destInputRef = useRef<HTMLInputElement>()
    useImperativeHandle(ref, () => ({
      destination: destInputRef,
    }))

    return (
      <Stack id={'test'} sx={{position: 'relative'}} onClick={justClickMode ? onClickInput : undefined}>
        <Controller
          name="destination.label"
          control={control}
          rules={{
            required: true,
          }}
          render={({fieldState, field}) => (
            <StandardTextField
              formControlProps={{sx: {paddingBottom: 0}}}
              autoFocus
              state={fieldState}
              inputProps={{readOnly: justClickMode}}
              fullWidth
              onClick={justClickMode ? undefined : onClickInput}
              onFocus={justClickMode ? undefined : onClickInput}
              placeholder={t`Hotel or destination city`}
              {...field}
              helperText={fieldState.error?.type === 'required' ? t`This field is required.` : undefined}
              ref={(current) => {
                field.ref(current)
                destInputRef.current = current || undefined
              }}
            />
          )}
        />
      </Stack>
    )
  }
)
