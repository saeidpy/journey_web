import {Trans} from '@lingui/macro'
import {Divider, Stack, styled, Tab as MuiTab, tabClasses, Tabs as MuiTabs, tabsClasses, Typography} from '@mui/material'
import {useQuery} from '@tanstack/react-query'
import {SyntheticEvent} from 'react'
import {useBookFlight} from 'src/core/book-flight/useBookFlight'
import {formatDate, formatDateByString} from 'src/shared/utils/jalaliDate'
import {tabPriceQuery} from './tabPrice.query'

export const Tab = styled(MuiTab)(({theme}) => ({
  ...theme.typography.subtitle1,
  color: theme.palette.shades[6.5],
  [`&`]: {
    padding: 0,
  },
  [`&> div > div`]: {
    border: '1px solid transparent',
    margin: theme.spacing(0.5, 1),
    padding: theme.spacing(0.5),
  },
  [`&.${tabClasses.selected}`]: {
    color: theme.palette.shades[6.5],
    // '& > div > div': {
    //   border: `1px solid ${theme.palette.primary.main}`,
    //   borderRadius: 1,
    // },
  },
}))

export const Tabs = styled(MuiTabs)({
  [`& .${tabsClasses.scrollButtons}`]: {
    '&.Mui-disabled': {opacity: 0.3},
  },
  [`& .${tabsClasses.indicator}`]: {
    display: 'none',
  },
})

export interface PriceType {
  date: Date
  price: string
  type?: 'complete' | 'low' | 'high'
  id: string
}

interface TabPriceProps {
  sessionId: string
  sourceCode: string
  destinationCode: string
  departureDate: string
  returnDate?: string
}

const LabelTab = (props: PriceType) => {
  const {date, price, type} = props
  const color = type === 'low' ? 'success.light' : type === 'high' ? 'error.main' : type === 'complete' ? 'black' : 'inherit'

  return (
    <Stack direction="row">
      <Stack>
        <Stack>{date && `${formatDate(date, 'weekdayShort')?.substring(0, 1)} - ${formatDateByString(date, 'MM/dd')}`}</Stack>
        <Stack>
          <Typography color={color}>{type === 'complete' ? <Trans>Full</Trans> : price ?? '---'}</Typography>
        </Stack>
      </Stack>
      <Divider orientation="vertical" variant="middle" flexItem />
    </Stack>
  )
}

export const TabPrice = ({sessionId, sourceCode, destinationCode, departureDate, returnDate}: TabPriceProps) => {
  const {data} = useQuery(['TabPrice', sessionId, sourceCode, destinationCode, departureDate, returnDate], tabPriceQuery)

  const {setBookFlight} = useBookFlight()

  const onChange = (_: SyntheticEvent, newValue: string) => {
    setBookFlight({
      departureDate: new Date(newValue),
    })
  }

  const dates = data ? Object.entries(data) : []
  const {highest, lowest} = dates.reduce(
    (prev, cur) =>
      cur[1]?.total
        ? {
            highest: cur[1].total > prev.highest ? cur[1].total : prev.highest,
            lowest: cur[1].total < prev.lowest ? cur[1].total : prev.lowest,
          }
        : prev,
    {
      highest: dates[0][1]?.total ?? 0,
      lowest: dates[0][1]?.total ?? Number.POSITIVE_INFINITY,
    }
  )

  return (
    <Stack mt={2} gap={2}>
      <Typography>
        <Trans>At the most economical price every day</Trans>
      </Typography>
      <Tabs value={dates[Math.round(dates.length / 2)][0]} onChange={onChange} variant="scrollable" scrollButtons allowScrollButtonsMobile>
        {dates.map(([date, item], i) => (
          <Tab
            key={i}
            value={date}
            label={
              <LabelTab
                date={new Date(date)}
                id={date}
                price={item?.total.toLocaleString('fa-IR', {useGrouping: true}) ?? ''}
                type={!item ? 'complete' : lowest === item.total ? 'low' : highest === item.total ? 'high' : undefined}
              />
            }
          />
        ))}
      </Tabs>
      <Divider orientation="horizontal" variant="fullWidth" flexItem />
    </Stack>
  )
}
