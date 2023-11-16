import {t} from '@lingui/macro'
import {Autocomplete, CircularProgress} from '@mui/material'
import React from 'react'
import {Controller} from 'react-hook-form'
import {InputProps} from 'src/shared/types/server'
import {StandardTextField} from '../../input'
import useProvinceSection from './useProvinceSection'

export const ProvinceSection = ({required}: InputProps) => {
  const {control, internalId, isFetching, options} = useProvinceSection()

  return (
    <Controller
      name={'province'}
      control={control}
      rules={{required: true}}
      render={({fieldState, field}) => (
        <Autocomplete
          isOptionEqualToValue={(option, value) => option.province_name_fa === value.province_name_fa}
          getOptionLabel={(option) => option.province_name_fa?.toString()}
          options={options ?? []}
          id="province"
          {...field}
          onChange={(e, newValue) => {
            field.onChange(newValue)
          }}
          loading={isFetching}
          renderInput={(params) => (
            <StandardTextField
              {...params}
              title={required ? t`Province *` : t`Province`}
              placeholder={t`Text`}
              id={internalId}
              required={required}
              state={fieldState}
              helperText={fieldState.error?.message}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {isFetching ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      )}
    />
  )
}
