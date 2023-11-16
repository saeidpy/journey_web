import {t, Trans} from '@lingui/macro'
import {Stack, styled, Typography} from '@mui/material'
import {useQuery} from '@tanstack/react-query'
import {SearchIcon} from 'src/assets/icons'
import {Button, SearchButton} from 'src/shared/button'
import {memberPassenger} from '../flight-ticket-info/queries/memberPassanger.query'
import {Spinner} from '../loading'
import {LastPassengerResponse} from '../types/server/hotel/HotelLastPassengerResponseType'

export const PASSENGER_LIST_MODAL_ID = 'PASSENGER_MODAL_ID'

export type PassengerFieldType = {
  adult: number
  child?: number
  infant?: number
}

const FullNameBox = styled(Stack)(() => ({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexDirection: 'row',
  padding: '5px',
}))

export interface LastPassengerListModalProps {
  selectPassenger: (data: LastPassengerResponse) => void
}

export function LastPassengerListModal({selectPassenger}: LastPassengerListModalProps) {
  const {data, isLoading} = useQuery(['memberPassenger'], memberPassenger, {suspense: false})

  const passengers = data?.result?.passengers ?? []

  const onConfirm = (passenger: LastPassengerResponse) => {
    selectPassenger(passenger)
  }

  return (
    <Stack flexDirection="column" width="100%" gap={3}>
      <SearchButton variant="outlined" fullWidth startIcon={<SearchIcon />}>
        <Typography color="shades.5" width="100%" textAlign="left" variant="caption">
          <Trans>search</Trans>
        </Typography>
      </SearchButton>
      {isLoading ? (
        <Stack>
          <Trans>Loading...</Trans>
          <Spinner />
        </Stack>
      ) : (
        passengers.map((passenger, index) => {
          const fullName = `${passenger.first_name} ${passenger.last_name}`
          const nationalCodeOrPassportCode = passenger.passport_no ?? passenger.national_id
          return (
            <Stack key={index} sx={{borderBottom: '1px solid #eeee'}}>
              <FullNameBox>
                <Typography>{t`FullName`}:</Typography> <Typography>{fullName}</Typography>
              </FullNameBox>
              <FullNameBox>
                <Typography>{t`nationalCodeOrPassportCode`}:</Typography> <Typography>{nationalCodeOrPassportCode}</Typography>
              </FullNameBox>
              <Stack display="flex" mr={5} mb={2} alignItems="flex-end">
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onConfirm(passenger)
                  }}
                  variant="outlined"
                  sx={{width: '300px', marginBottom: '3px'}}
                >
                  <Trans>select</Trans>
                </Button>
              </Stack>
            </Stack>
          )
        })
      )}
    </Stack>
  )
}
