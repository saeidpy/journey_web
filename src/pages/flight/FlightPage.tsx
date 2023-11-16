import {t, Trans} from '@lingui/macro'
import {InputAdornment, InputLabel, Stack, styled, Typography, useTheme} from '@mui/material'
import {MobileDatePicker} from '@mui/x-date-pickers'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {Controller, FormProvider, SubmitHandler, useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import {Calendar} from 'src/assets/icons'
import {BookFlightValue, useBookFlight} from 'src/core/book-flight/useBookFlight'
import {Button} from 'src/shared/button'
import {RangeDatePicker, StandardTextField, TextInput} from 'src/shared/input'
import {InputForDepartureDate, InputForReturnDate} from 'src/shared/input/RangeDatePicker'
import {Header} from 'src/shared/layouts/app-layout'
import {useModalSheet} from 'src/shared/modal-sheet'
import {FlightPassengerCountModal, PassengerFieldType, PASSENGER_MODAL_ID} from 'src/shared/passenger-count-modal'
import {FlightType} from 'src/shared/types/server'
import {shouldForwardProp} from 'src/shared/utils/shouldForwardProp'
import {SearchCityDialog} from './search-city/SearchCityDialog'
import {SearchInputs} from './search-inputs/SearchInputs'

export type InputProps = {
  flight_type: string
  srcCity: {label: string; value: string | null}
  destCity: {label: string; value: string | null}
  departure_date: Date | null
  return_date?: Date | null
  count: PassengerFieldType
  rangeDate: [Date | null, Date | null]
}

const TextInputForPassengersCount = styled(TextInput)(({theme}) => ({
  marginTop: '0px !important',
  '& input': {
    border: `1px solid ${theme.palette.shades[4]}`,
  },
}))

const WrapperForData = styled(Stack)(({theme}) => ({
  position: 'relative',
  borderBottom: `1px solid ${theme.palette.shades[4]}`,
  paddingTop: theme.spacing(2),
  margin: theme.spacing(0, -2),
  flexDirection: 'row',
}))

const InputForSingleDate = styled(StandardTextField)(({theme}) => ({
  '& .MuiInputBase-root': {backgroundColor: theme.palette.shades[2]},
  '& input': {
    padding: `${theme.spacing(1, 2, 1, 0)} !important`,
    height: theme.spacing(4),
  },
}))

// const InputForDepartureDate = styled(StandardTextField)(({theme}) => ({
//   '& .MuiInputBase-root': {backgroundColor: theme.palette.shades[2]},
//   '&>div': {
//     borderRadius: theme.spacing(1),
//     borderTopRightRadius: '0 !important',
//     borderBottomRightRadius: '0 !important',
//   },
//   '& input': {
//     padding: `${theme.spacing(1, 2)} !important`,
//     height: theme.spacing(4),
//   },
// }))

// const InputForReturnDate = styled(StandardTextField)(({theme}) => ({
//   '& .MuiInputBase-root': {backgroundColor: theme.palette.shades[2]},
//   '&>div': {
//     borderRadius: theme.spacing(1),
//     borderTopLeftRadius: '0 !important',
//     borderBottomLeftRadius: '0 !important',
//   },
//   '& input': {
//     padding: `${theme.spacing(1, 2)} !important`,
//     height: theme.spacing(4),
//   },
// }))

const StyledForm = styled('form')({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
})

const TabButton = styled(Button, {shouldForwardProp})<{selected: boolean}>(({selected, theme}) => ({
  ...(selected ? theme.typography.h3 : theme.typography.caption),
  borderBottom: selected ? `2px solid ${theme.palette.shades[9]}` : 'none',
  color: selected ? theme.palette.shades[9] : theme.palette.shades[8],
  borderRadius: 0,
}))

export default function Flight() {
  const {
    bookFlight: {adultCount, childCount, infantCount, dest, src, departureDate, returnDate, isOneWay: isOneWayCtx},
    setBookFlight,
  } = useBookFlight()
  const navigate = useNavigate()
  const defaultValues = useMemo(
    () => ({
      flight_type: '1',
      srcCity: src,
      destCity: dest,
      departure_date: departureDate,
      return_date: returnDate,
      count: {
        adult: adultCount === 0 ? 1 : adultCount,
        child: childCount,
        infant: infantCount,
      },
      rangeDate: [departureDate ?? null, returnDate ?? null],
    }),
    [adultCount, childCount, departureDate, dest, infantCount, returnDate, src]
  )
  const methods = useForm<InputProps>({
    defaultValues: defaultValues as InputProps,
  })

  const {handleSubmit, control, setValue, getValues, reset} = methods
  const [open, setOpen] = useState(false)
  const [departureDateValue, setDepartureDateValue] = useState<Date | null>(departureDate ?? null)
  const [returnDateValue, setReturnDateValue] = useState<Date | null>(returnDate ?? null)
  const [openSearchCityDialog, setOpenSearchCityDialog] = useState(false)
  const [isOneWay, setIsOneWay] = useState<boolean>(isOneWayCtx)
  const theme = useTheme()
  const {openModal, closeModal} = useModalSheet()

  useEffect(() => {
    reset(defaultValues as InputProps)
  }, [defaultValues, reset])

  const onSubmit: SubmitHandler<InputProps> = useCallback(
    (data: InputProps) => {
      if (data.count.adult && (data.departure_date || data.rangeDate[0])) {
        const info: BookFlightValue = {
          isOneWay,
          adultCount: data.count.adult,
          childCount: data.count.child ?? 0,
          infantCount: data.count.infant ?? 0,
          departureDate: data.departure_date ? new Date(data.departure_date) : new Date(data.rangeDate[0] ?? ''),
          src: data.srcCity,
          dest: data.destCity,
          type: FlightType.DOMESTIC,
          passengers: [],
          passengersInput: [],
          selectedTicket: undefined,
          sessionId: undefined,
          returnDate: !isOneWay && data.rangeDate[1] ? new Date(data.rangeDate[1]) : null,
        }

        setBookFlight(info)
        navigate('/flight/search-flight-result')
      }
    },
    [setBookFlight, isOneWay, navigate]
  )

  const onSubmitPassengerModal = (param: PassengerFieldType) => {
    setValue('count', param)
    closeModal()
  }

  const PassengerCountClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    const defaultValue = getValues('count')
    openModal(PASSENGER_MODAL_ID, {
      content: <FlightPassengerCountModal onSubmit={onSubmitPassengerModal} defaultValue={defaultValue} />,
      title: t`Passengers`,
    })
  }
  const getPassengerCountText = useCallback((value: PassengerFieldType): string => {
    return value.adult ? `${value.adult + (value?.child ?? 0) + (value?.infant ?? 0)} ${t`Passenger`}` : ''
  }, [])

  const onClickSearchInputs = () => {
    setOpenSearchCityDialog(true)
  }

  const onCloseSearchCityDialog = () => {
    setOpenSearchCityDialog(false)
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
  const [valueButton, setValueTab] = useState(0)

  const handleChangeButton = (event: React.SyntheticEvent, newValueButton: number) => {
    setValueTab(newValueButton)
  }
  return (
    <>
      <Header hasBackButton title={t`Airplane ticket`} fullWidth />
      <FormProvider {...methods}>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
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
          {/* <Stack p={4}>
          <Controller
            name="flight_type"
            control={control}
            rules={{
              required: true,
            }}
            render={({fieldState, field}) => (
              <BasicRadio
                RadioList={[
                  {label: t`Domestic flights`, value: '1'},
                  {label: t`International flights`, value: '2'},
                ]}
                {...field}
                label={t`Category`}
                state={fieldState}
                control={<></>}
                onChange={field.onChange}
                helperText={fieldState.error?.type === 'required' ? t`This field is required.` : undefined}
              />
            )}
          />
        </Stack> */}
          <WrapperForData>
            <Stack flex={1}>
              <TabButton
                selected={isOneWay}
                onClick={() => {
                  setValue('return_date', undefined)
                  // setReturnDateValue(null)
                  setIsOneWay(true)
                }}
                variant="text"
                fullWidth
              >
                <Trans>One-way</Trans>
              </TabButton>
            </Stack>
            <Stack flex={1}>
              <TabButton
                selected={!isOneWay}
                onClick={() => {
                  setIsOneWay(false)
                }}
                variant="text"
                fullWidth
              >
                <Trans>Round-trip</Trans>
              </TabButton>
            </Stack>
          </WrapperForData>
          <Stack mt={3} pb={1}>
            <Typography color="shades.8">
              <Trans>Origin and destination</Trans>
            </Typography>
            <SearchInputs onClickInput={onClickSearchInputs} justClickMode />
          </Stack>

          <Stack pt={2} pb={1}>
            {/* <Typography color="shades.8">
              <Trans>Select Date</Trans>
            </Typography> */}
            {isOneWay ? (
              <Controller
                name="departure_date"
                control={control}
                rules={{
                  required: true,
                }}
                render={({fieldState, field}) => (
                  <MobileDatePicker
                    disablePast
                    shouldDisableDate={(day: Date) => day.getTime() - new Date(new Date().toDateString()).getTime() < 24 * 60 * 60 * 1000}
                    inputFormat="yyyy-MM-dd"
                    value={departureDateValue}
                    onChange={(date) => {
                      setDepartureDateValue(date)
                      field.onChange(date?.toISOString().split('.')[0])
                    }}
                    DialogProps={{dir: theme.direction}}
                    renderInput={(params) => (
                      <InputForSingleDate
                        {...params}
                        {...field}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Calendar />
                            </InputAdornment>
                          ),
                          readOnly: true,
                        }}
                        fullWidth
                        title={t`Select Date`}
                        state={fieldState}
                        helperText={fieldState.error?.type === 'required' ? t`This field is required.` : undefined}
                        InputLabelProps={{shrink: false}}
                        placeholder={t`Departure date`}
                      />
                    )}
                  />
                )}
              />
            ) : (
              <Stack flexDirection="row">
                <Stack flex={1}>
                  <Controller
                    control={control}
                    name="rangeDate"
                    rules={{required: true}}
                    render={({fieldState, field}) => (
                      <RangeDatePicker
                        disablePast
                        open={open}
                        setOpen={setOpen}
                        title={t`Select Date`}
                        value={[departureDate ? new Date(departureDate) : null, returnDate ? new Date(returnDate) : null]}
                        state={fieldState}
                        onChange={(data: [Date | null, Date | null]) => {
                          field.onChange(data)
                          if (data[0]) {
                            setValue('departure_date', data[0])
                          }
                          setDepartureDateValue(data[0])
                          setReturnDateValue(data[1])
                        }}
                        onAccept={(data) => {}}
                        renderInput={(params) => (
                          <>
                            <InputLabel sx={{position: 'relative'}} shrink htmlFor={params.id}>
                              <Trans>Select Date</Trans>
                            </InputLabel>
                            <Stack flexDirection="row" mt={-1}>
                              <Stack flex={1}>
                                <InputForDepartureDate
                                  disabled
                                  onClick={() => setOpen(true)}
                                  value={departureDateValue ? new Date(departureDateValue).toLocaleDateString('fa-IR') : ''}
                                  state={fieldState}
                                  fullWidth
                                  helperText={fieldState.error?.type === 'required' ? t`This field is required.` : undefined}
                                  InputLabelProps={{shrink: false}}
                                  placeholder={t`Departure date`}
                                />
                              </Stack>
                              <Stack flex={1}>
                                <InputForReturnDate
                                  disabled
                                  onClick={() => setOpen(true)}
                                  state={fieldState}
                                  value={returnDateValue ? new Date(returnDateValue).toLocaleDateString('fa-IR') : ''}
                                  fullWidth
                                  InputLabelProps={{shrink: false}}
                                  placeholder={t`Return date`}
                                />
                              </Stack>
                            </Stack>
                            {/* <TextField {...params} fullWidth={fullWidth} color={color} id={id ?? internalId} inputRef={ref} /> */}
                            {params.helperText ? (
                              <Typography
                                variant="subtitle1"
                                color={
                                  !fieldState.error && fieldState.isDirty
                                    ? 'success'
                                    : fieldState.error
                                    ? 'error'
                                    : fieldState.invalid
                                    ? 'warning'
                                    : undefined
                                }
                              >
                                {params.helperText}
                              </Typography>
                            ) : (
                              ''
                            )}
                          </>
                        )}
                      />
                    )}
                  />
                </Stack>
              </Stack>
            )}
          </Stack>
          <Stack pt={2} pb={1}>
            <Typography color="shades.8">
              <Trans>Passengers count</Trans>
            </Typography>
            <Controller
              name="count"
              control={control}
              rules={{
                required: true,
                validate: (data) => {
                  const count = data.adult + (data.child ?? 0) + (data.infant ?? 0)
                  if (count < 1) {
                    return false
                  } else {
                    return true
                  }
                },
              }}
              render={({fieldState, field}) => (
                <TextInputForPassengersCount
                  state={fieldState}
                  value={getPassengerCountText(field.value)}
                  fullWidth
                  onChange={field.onChange}
                  onClick={PassengerCountClick}
                  type="text"
                  inputProps={{readOnly: true}}
                  placeholder={t`Passengers count`}
                  helperText={
                    fieldState.error?.type === 'validate' || fieldState.error?.type === 'required' ? t`This field is required.` : undefined
                  }
                />
              )}
            />
          </Stack>
          <SearchCityDialog open={openSearchCityDialog} handleClose={onCloseSearchCityDialog} />
          <Stack justifyContent="end" height="100%" py={2}>
            <Button fullWidth variant="contained" color="primary" type="submit">
              <Trans>Search</Trans>
            </Button>
          </Stack>
        </StyledForm>
      </FormProvider>
    </>
  )
}
