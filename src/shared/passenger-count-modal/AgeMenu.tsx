import {t} from '@lingui/macro'
import {Stack} from '@mui/material'
import {Controller, useFormContext} from 'react-hook-form'
import {DropDownList} from '../input'
import {PassengerCountType} from './HotelPassengerCountModal'

const agesList = [
  {value: 1, label: t`1 year`},
  {value: 2, label: t`2 years`},
  {value: 3, label: t`3 years`},
  {value: 4, label: t`4 years`},
  {value: 5, label: t`5 years`},
  {value: 6, label: t`6 years`},
  {value: 7, label: t`7 years`},
  {value: 8, label: t`8 years`},
  {value: 9, label: t`9 years`},
  {value: 10, label: t`10 years`},
  {value: 11, label: t`11 years`},
]

interface AgeMenuProps {
  index: number
  indexValue: number
}

const AgeMenu = ({index, indexValue}: AgeMenuProps) => {
  const {control} = useFormContext<PassengerCountType>()
  return (
    <Stack>
      <Controller
        name={`count.${index}.childAge.${indexValue}`}
        control={control}
        rules={{
          required: true,
        }}
        render={({fieldState, field}) => {
          return (
            <DropDownList
              state={fieldState}
              title={t`child` + (indexValue + 1)}
              helperText={fieldState.error ? t`This field is required.` : ``}
              {...field}
              optionList={agesList}
            />
          )
        }}
      />
    </Stack>
  )
}

export default AgeMenu
