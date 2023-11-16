import {t, Trans} from '@lingui/macro'
import {InfoOutlined} from '@mui/icons-material'
import {Divider, Stack, Typography} from '@mui/material'
import {useEffect, useState} from 'react'
import {Button} from 'src/shared/button'
import {PassengerCounter} from './PassengerCounter'

export const PASSENGER_MODAL_ID = 'PASSENGER_MODAL_ID'

export type PassengerFieldType = {
  adult: number
  child?: number
  infant?: number
}

export const FlightPassengerCountModal = ({
  onSubmit,
  errorMessage,
  defaultValue = {adult: 0, child: 0, infant: 0},
}: {
  onSubmit: (param: PassengerFieldType) => void
  errorMessage?: string
  defaultValue: PassengerFieldType
}) => {
  const [{adult = 0, child = 0, infant = 0}, setParams] = useState<PassengerFieldType>(defaultValue)
  const totalCount = adult + child + infant
  const [errorText, setErrorText] = useState<string | null>(null)

  const onChange = (name: keyof PassengerFieldType, count: number) => {
    setParams((prev) => ({...prev, [name]: count}))
  }

  const isPassengerCountValidate = () => {
    const isInfantCountLessOrEqualAdult = infant <= adult
    return totalCount <= 10 && isInfantCountLessOrEqualAdult
  }
  const onConfirm = () => {
    if (isPassengerCountValidate()) {
      onSubmit({adult, child, infant})
    } else {
      setErrorText(t`The number of infants should not be less than adults and the number of passengers should not be more than 10 people.`)
    }
  }

  useEffect(() => {
    if (adult < infant) {
      setParams((prev) => ({...prev, infant: adult}))
    }
  }, [adult, infant])

  return (
    <Stack flexDirection="column" width="100%" gap={3}>
      <PassengerCounter value={adult} onChange={onChange} name="adult" title={t`Adult passenger`} disabled={totalCount >= 10} index={0} />
      <Divider />
      <PassengerCounter value={child} onChange={onChange} name="child" title={t`Child passenger`} disabled={totalCount >= 10} index={1} />
      <Divider />
      <PassengerCounter
        value={infant}
        onChange={onChange}
        name="infant"
        title={t`Infant passenger`}
        disabled={adult <= infant || totalCount >= 10}
        index={2}
      />
      {errorMessage && (
        <Stack flexDirection="row" width="100%" gap={1}>
          <InfoOutlined color="error" />
          <Typography color="error">{errorMessage}</Typography>
        </Stack>
      )}
      {errorText && (
        <Stack flexDirection="row" width="100%" gap={1}>
          <InfoOutlined color="error" />
          <Typography color="error">{errorText}</Typography>
        </Stack>
      )}
      <Button onClick={onConfirm} variant="contained" mt={3}>
        <Trans>Confirm</Trans>
      </Button>
    </Stack>
  )
}
