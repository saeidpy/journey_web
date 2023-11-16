import {t} from '@lingui/macro'
import {Autocomplete, CircularProgress} from '@mui/material'
import React from 'react'
import {Controller} from 'react-hook-form'
import {InputProps} from 'src/shared/types/server'
import {StandardTextField} from '../../input'
import useCitySection from './useCitySection'

export const CitySection = ({required}: InputProps) => {
  const {internalId, isFetching, provinceId, control, options} = useCitySection()

  return (
    <Controller
      name={'city'}
      control={control}
      rules={{required: true}}
      render={({fieldState, field}) => (
        <Autocomplete
          {...field}
          disabled={!provinceId}
          isOptionEqualToValue={(option, value) => option.city_name_fa === value.city_name_fa}
          getOptionLabel={(option) => option.city_name_fa}
          options={options ?? []}
          id="city"
          onChange={(e, newValue) => {
            field.onChange(newValue)
          }}
          loading={isFetching}
          renderInput={(params) => (
            <StandardTextField
              {...params}
              title={required ? t`City *` : t`City`}
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
