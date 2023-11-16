import {t, Trans} from '@lingui/macro'
import {Stack} from '@mui/material'
import {useQueries} from '@tanstack/react-query'
import {ReactNode, useState} from 'react'
import {useLocation, useSearchParams} from 'react-router-dom'
import {Exchange, Filter, NightIcon, SunIcon, SunriseIcon, SunsetIcon} from 'src/assets/icons'
import {Button} from 'src/shared/button'
import {useModalSheet} from 'src/shared/modal-sheet'
import {parseParamQuery} from 'src/shared/utils/paramQuery'
import {
  // filterAgesQuery,
  filterAirlineQuery,
  // filterCabinQuery,
  filterDepartureTimeQuery,
  // filterGendersQuery,
  filterTicketQuery,
  filterTicketsSortQuery,
} from './filter.query'
import {FilterDialog} from './FilterDialog'
import {SortSheet} from './SortSheet'

// TODO: TEMP VARS
// const ticketType = [
//   {id: 'system', label: 'سیستمی'},
//   {id: 'charter', label: 'چارتر'},
// ]
const minPrice = 980000
const maxPrice = 120000000
// const aircraftCompTemp = [
//   {id: 'aseman', label: 'آسمان'},
//   {id: 'mahan', label: 'ماهان'},
// ]

const times: {[key: string]: {icon: ReactNode; title: ReactNode; description: ReactNode}} = {
  morning: {
    icon: <SunriseIcon />,
    title: <Trans>Morning</Trans>,
    description: <Trans>From 5 to 12 morning</Trans>,
  },
  noon: {
    icon: <SunIcon />,
    title: <Trans>Noon</Trans>,
    description: <Trans>From 12 to 16 noon</Trans>,
  },
  afternoon: {
    icon: <SunsetIcon />,
    title: <Trans>Afternoon</Trans>,
    description: <Trans>From 16 to 20 afternoon</Trans>,
  },
  night: {
    icon: <NightIcon />,
    title: <Trans>Night</Trans>,
    description: <Trans>From 20 to 24 night</Trans>,
  },
}

type SortAndFilterType = {
  refetch: () => void
}
function SortAndFilter({refetch}: SortAndFilterType) {
  const [filterTicket, filterAirline, filterTicketsSort, filterDepartureTime] = useQueries({
    queries: [
      // {queryKey: ['filterCabinQuery'], queryFn: filterCabinQuery},
      // {queryKey: ['filterAgesQuery'], queryFn: filterAgesQuery},
      {queryKey: ['filterTicketQuery'], queryFn: filterTicketQuery},
      {queryKey: ['filterAirlineQuery'], queryFn: filterAirlineQuery},
      // {queryKey: ['filterGendersQuery'], queryFn: filterGendersQuery},
      {queryKey: ['filterTicketsSortQuery'], queryFn: filterTicketsSortQuery},
      {queryKey: ['filterDepartureTimeQuery'], queryFn: filterDepartureTimeQuery},
    ],
  })
  const {openModal, closeModal} = useModalSheet()
  const [filterOpen, setFilterOpen] = useState(false)
  const {search} = useLocation()
  const queryFromUrl = parseParamQuery(search)
  const setUrlParam = useSearchParams()[1]
  const handleToggle = (id: string) => {
    onCloseSortModal()
    window.setTimeout(() => {
      setUrlParam({...queryFromUrl, sortBy: id})
    }, 225)
    refetch()
  }

  const onCloseSortModal = () => {
    closeModal()
  }
  const onClickSort = () => {
    if (filterTicketsSort.data) {
      openModal('sort-sheet', {
        content: (
          <SortSheet
            handleToggle={handleToggle}
            onClose={onCloseSortModal}
            defaultSelected={queryFromUrl?.['sortBy']}
            sortList={filterTicketsSort.data.map((i) => ({label: i[0], id: i[1]}))}
          />
        ),
        title: t`Sort by`,
      })
    }
  }

  return (
    <Stack direction="row" gap={1} mt={2}>
      <Button
        onClick={() => setFilterOpen(true)}
        sx={{py: 0.5}}
        color="inherit"
        startIcon={<Filter />}
        variant="outlined"
        disabled={!filterDepartureTime.data || !filterTicket.data || !filterAirline.data}
      >
        <Trans>Filter</Trans>
      </Button>
      <Button
        onClick={onClickSort}
        disabled={!filterTicketsSort.data}
        sx={{py: 0.5}}
        color="inherit"
        startIcon={<Exchange />}
        variant="outlined"
      >
        <Trans>Sort by</Trans>
      </Button>
      {filterDepartureTime.data && filterTicket.data && filterAirline.data && (
        <FilterDialog
          refetch={refetch}
          open={filterOpen}
          handleClose={() => {
            setFilterOpen(false)
            window.setTimeout(() => {
              refetch()
            }, 225)
            refetch()
          }}
          minPrice={minPrice}
          maxPrice={maxPrice}
          ticketTypesList={filterTicket.data.map((i) => ({id: i[1].toString(), label: i[0]}))}
          aircraftCompList={filterAirline.data.map((i) => ({id: i[1].toString(), label: i[0]}))}
          times={filterDepartureTime.data.map((i) => ({...times[i[1]], id: i[1].toString(), title: i[0] ?? times[i[1]].title}))}
        />
      )}
    </Stack>
  )
}

export default SortAndFilter
