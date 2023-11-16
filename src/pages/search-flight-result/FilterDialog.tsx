import {t, Trans} from '@lingui/macro'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Slide,
  Slider,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material'
import {TransitionProps} from '@mui/material/transitions'
import {forwardRef, ReactNode, useEffect, useState} from 'react'
import {useLocation, useSearchParams} from 'react-router-dom'
import {CheckboxChecked, CheckboxUnchecked, DeleteIcon} from 'src/assets/icons'
import {Button} from 'src/shared/button'
import {mobileUI} from 'src/shared/constants'
import {Header} from 'src/shared/layouts/app-layout'
import {numberWithCommas} from 'src/shared/utils/math'
import {parseParamQuery} from 'src/shared/utils/paramQuery'

type FilterDialogProps = {
  open: boolean
  handleClose: () => void
  minPrice: number
  maxPrice: number
  ticketTypesList: {id: string; label: string}[]
  aircraftCompList: {id: string; label: string}[]
  times: {id: string; icon: ReactNode; title: ReactNode; description: ReactNode}[]
  refetch: () => void
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />
})

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} defaultExpanded {...props} />)(
  ({theme}) => ({
    borderTop: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  })
)

const CustomDialogActions = styled(DialogActions)(({theme}) => ({
  padding: 0,
}))

const CustomDialogContent = styled(DialogContent)(({theme}) => ({
  padding: 0,
}))

const gatherPriceRange = (priceRange: string | [number, number]) =>
  typeof priceRange === 'string'
    ? ([parseInt(priceRange.split('-')[0]), parseInt(priceRange.split('-')[1])] as [number, number])
    : priceRange

export const FilterDialog = ({
  refetch,
  open,
  handleClose,
  minPrice,
  maxPrice,
  ticketTypesList,
  aircraftCompList,
  times,
}: FilterDialogProps) => {
  const theme = useTheme()
  const setUrlParam = useSearchParams()[1]
  const [timeRange, setSelectedTime] = useState('')
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice])
  const [ticketType, setSelectedTicketType] = useState('')
  const [aircraftComp, setSelectedAircraft] = useState('')
  const {search} = useLocation()
  const queryFromUrl = parseParamQuery(search)
  useEffect(() => {
    setSelectedTime(queryFromUrl.timeRange ?? '')
    setPriceRange((prev) => gatherPriceRange(queryFromUrl.priceRange ?? prev))
    setSelectedTicketType(queryFromUrl.ticketType ?? '')
    setSelectedAircraft(queryFromUrl.aircraftComp ?? '')
  }, [queryFromUrl.aircraftComp, queryFromUrl.priceRange, queryFromUrl.ticketType, queryFromUrl.timeRange])

  const onClickTime = (id: string) => {
    setSelectedTime((prev) => (prev === id ? '' : id))
  }
  const handleChange = (_: Event, value: number | number[]) => {
    if (!Array.isArray(value)) {
      return
    }
    setPriceRange(value as [number, number])
  }
  const onClickSubmitFilter = () => {
    handleClose()
    window.setTimeout(() => {
      const newParams = {
        ...queryFromUrl,
        priceRange: priceRange.join('-'),
        aircraftComp,
        ticketType,
        timeRange,
      }

      setUrlParam(JSON.parse(JSON.stringify(newParams)))
      refetch()
    }, 225)
  }
  const onClickRest = () => {
    setSelectedTime('')
    setPriceRange([minPrice, maxPrice])
    setSelectedTicketType('')
    setSelectedAircraft('')
  }

  return (
    <Dialog
      sx={{maxWidth: mobileUI.shared.maxWidth, margin: 'auto'}}
      fullScreen
      open={open}
      maxWidth="sm"
      onClose={handleClose}
      TransitionComponent={Transition}
      disablePortal
    >
      <CustomDialogActions>
        <Header hasBackButton={true} backButtonCallback={handleClose} title={t`Filter`} />
      </CustomDialogActions>

      <CustomDialogContent>
        <Accordion disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography>
              <Trans>Time to move</Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack direction="row" flexWrap="wrap" justifyContent="space-between" gap={2}>
              {times.map((element) => (
                <Button
                  key={element.id}
                  onClick={() => onClickTime(element.id)}
                  variant="contained"
                  sx={{
                    padding: 1.5,
                    flex: 1,
                    minWidth: 162,
                    backgroundColor: theme.palette.background.default,
                    color: timeRange === element.id ? theme.palette.primary.main : 'inherit',
                    border: timeRange === element.id ? '2px solid ' + theme.palette.primary.main : '2px solid transparent',
                    '&:hover': {
                      backgroundColor: 'unset',
                    },
                  }}
                >
                  <Stack direction="column" alignItems="center" gap={1}>
                    <Typography variant="button" sx={{display: 'flex', alignItems: 'center', gap: 0.5}}>
                      {element.icon}
                      {element.title}
                    </Typography>
                    <Typography variant="caption">{element.description}</Typography>
                  </Stack>
                </Button>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
            <Typography>
              <Trans>Price range</Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack gap={1} p={1}>
              <Stack direction={'row'} gap={3}>
                <Typography>
                  <Trans>From {numberWithCommas(priceRange[0])} Toman</Trans>
                </Typography>
                <Typography>
                  <Trans>To {numberWithCommas(priceRange[1])} Toman</Trans>
                </Typography>
              </Stack>
              <Slider value={priceRange} onChange={handleChange} min={minPrice} max={maxPrice} valueLabelDisplay="auto" />
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
            <Typography>
              <Trans>Ticket type</Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List disablePadding>
              {ticketTypesList.map((value) => {
                const labelId = `checkbox-list-secondary-label-${value.id}`
                return (
                  <ListItem key={value.id} disablePadding>
                    <Checkbox
                      size="medium"
                      onClick={() => setSelectedTicketType((prev) => (prev === value.id ? '' : value.id))}
                      checked={ticketType === value.id}
                      inputProps={{'aria-labelledby': labelId}}
                      icon={<CheckboxUnchecked />}
                      checkedIcon={<CheckboxChecked />}
                    />
                    <ListItemText id={value.id} primary={value.label} />
                  </ListItem>
                )
              })}
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
            <Typography>
              <Trans>Airline company</Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List disablePadding>
              {aircraftCompList.map((value) => {
                const labelId = `checkbox-list-secondary-label-${value.id}`
                return (
                  <ListItem key={value.id} disablePadding>
                    <Checkbox
                      size="medium"
                      onClick={() => setSelectedAircraft((prev) => (prev === value.id ? '' : value.id))}
                      checked={aircraftComp === value.id}
                      inputProps={{'aria-labelledby': labelId}}
                      icon={<CheckboxUnchecked />}
                      checkedIcon={<CheckboxChecked />}
                    />
                    <ListItemText id={value.id} primary={value.id} />
                  </ListItem>
                )
              })}
            </List>
          </AccordionDetails>
        </Accordion>
      </CustomDialogContent>
      <DialogActions sx={{borderTop: '1px solid ' + theme.palette.divider, paddingTop: 4, paddingBottom: 2}}>
        <Button onClick={onClickSubmitFilter} variant="contained" fullWidth>
          <Trans>Save filter</Trans>
        </Button>
        <Button onClick={onClickRest} variant="text" fullWidth color="error" startIcon={<DeleteIcon />}>
          <Trans>Delete filter</Trans>
        </Button>
      </DialogActions>
    </Dialog>
  )
}
