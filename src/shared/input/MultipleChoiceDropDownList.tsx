import {Autocomplete, AutocompleteRenderInputParams, FormControl} from '@mui/material'
import {createRef, forwardRef, useId} from 'react'
import {StandardTextField} from './StandartTextField'
import {InputProps, InputState, MultipleChoiceDropDownListProps} from './types'

export const MultipleChoiceDropDownList = forwardRef(
  (
    {
      formControlProps,
      id,
      title,
      helperText,
      state: {error, invalid, isDirty},
      fullWidth,
      optionList,
      onChange,
      value,
    }: InputProps & Omit<MultipleChoiceDropDownListProps, 'helperText'>,
    ref
  ) => {
    const inputRef = createRef<HTMLInputElement>()
    const inputState = {error: error, invalid: invalid, isDirty: isDirty} as InputState
    const color = !error && isDirty ? 'success' : error ? 'error' : invalid ? 'warning' : undefined
    const internalId = useId()
    return (
      <FormControl error={error !== undefined} variant="outlined" {...formControlProps} fullWidth={fullWidth} color={color}>
        <Autocomplete
          multiple
          limitTags={-1}
          id="tags-standard"
          options={optionList.map((x) => x.label)}
          value={value}
          getOptionLabel={(option) => option}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              e.preventDefault()
              const inputValue = inputRef.current?.['value']
              if (inputValue) {
                onChange([...(value.length ? value : []), inputValue])
              }
            }
          }}
          onChange={(e: any, data) => {
            onChange(data.map((x) => x))
          }}
          onBlur={(e: any) => {
            const inputValue = inputRef.current?.['value']
            if (inputValue) {
              onChange([...(value.length ? value : []), inputValue])
            }
          }}
          isOptionEqualToValue={(option, value) => {
            return option === value
          }}
          renderInput={(params: AutocompleteRenderInputParams) => (
            <StandardTextField
              {...params}
              fullWidth
              state={inputState}
              id={id ?? internalId}
              title={title}
              helperText={helperText}
              ref={inputRef}
            />
          )}
        />
      </FormControl>
    )
  }
)
