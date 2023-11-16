import {t, Trans} from '@lingui/macro'
import {Stack, styled} from '@mui/material'
import {useEffect, useState} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useNavigate} from 'react-router'
import {BookHotelValueType, useBookHotel} from 'src/core/book-hotel/useBookHotel'
import {Button} from 'src/shared/button'
import {PassengerCountInput} from 'src/shared/hotel'
import HotelDateInput from 'src/shared/hotel/hotel-inputs/HotelDateInput'
import {Header} from 'src/shared/layouts/app-layout'
import {HotelOrCityType} from 'src/shared/types/server'
import {dateApiFormat} from 'src/shared/utils/jalaliDate'
import {HotelSearchInput} from './hotel-search-destination/HotelSearchInput'
import {SearchHotelDialog} from './hotel-search-destination/SearchHotelDialog'

export type HotelInputType = BookHotelValueType

const StyledForm = styled('form')({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
})

export default function HotelPage() {
  const navigate = useNavigate()
  const {bookHotel, setBookHotel} = useBookHotel()
  const {count, destination, rangeDate} = bookHotel
  const methods = useForm<HotelInputType>({
    defaultValues: {
      count: count?.length ? count : [{adult: 1, child: 0, childAge: []}],
      destination: destination?.label ? destination : {label: '', value: ''},
      rangeDate,
    },
  })
  const {handleSubmit, reset} = methods

  useEffect(() => {
    reset(bookHotel)
  }, [reset])

  const [openSearchHotelDialog, setOpenSearchHotelDialog] = useState(false)

  const onClickSearchInputs = () => {
    setOpenSearchHotelDialog(true)
  }

  const onCloseSearchHotelDialog = () => {
    setOpenSearchHotelDialog(false)
  }

  const DomesticInternationalFlights = styled(Stack)(({theme}) => ({
    backgroundColor: '#EAEAEA',
    height: '40px',
    borderRadius: '64px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  }))

  const submit = (data: HotelInputType) => {
    const Data: HotelInputType = {
      ...data,
      rangeDate: [dateApiFormat(data.rangeDate?.[0] ?? ''), dateApiFormat(data.rangeDate?.[1] ?? '')],
    }
    setBookHotel(Data)
    if (data.destination?.type === HotelOrCityType.city) {
      navigate('/hotel/search-result')
    } else {
      navigate('/hotel/hotel-details/' + data?.destination?.value)
    }
  }

  const [valueButton, setValueTab] = useState(0)

  const handleChangeButton = (event: React.SyntheticEvent, newValueButton: number) => {
    setValueTab(newValueButton)
  }
  return (
    <>
      <Header title={t`Hotel reservation`} fullWidth hasBackButton />
      <FormProvider {...methods}>
        <StyledForm onSubmit={handleSubmit(submit)}>
          <DomesticInternationalFlights py={3} px={1} mt={2}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: valueButton === 0 ? '#FFFF' : 'transparent',
                color: 'black',
                ':hover': {
                  bgcolor: '#FFFF',
                },
                borderRadius: '16px',
                width: '156px',
                height: '32px',
              }}
              onClick={(event) => handleChangeButton(event, 0)}
            >
              {t`Internal`}
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: valueButton === 1 ? '#FFFF' : 'transparent',
                color: 'black',
                ':hover': {
                  bgcolor: '#FFFF',
                },
                borderRadius: '16px',
                width: '156px',
                height: '32px',
              }}
              onClick={(event) => handleChangeButton(event, 1)}
            >
              {t`Foreign`}
            </Button>
          </DomesticInternationalFlights>
          <Stack pt={3} pb={2}>
            <HotelSearchInput onClickInput={onClickSearchInputs} justClickMode />
          </Stack>
          <Stack pt={1} pb={2}>
            <HotelDateInput />
          </Stack>
          <Stack pt={1} pb={2}>
            <PassengerCountInput />
          </Stack>
          <SearchHotelDialog open={openSearchHotelDialog} handleClose={onCloseSearchHotelDialog} />
          <Stack justifyContent="flex-end" height="100%" pt={2}>
            <Button variant="contained" type="submit">
              <Trans>Search</Trans>
            </Button>
          </Stack>
        </StyledForm>
      </FormProvider>
    </>
  )
}
