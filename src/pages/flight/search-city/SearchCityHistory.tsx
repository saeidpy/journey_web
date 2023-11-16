import {Trans} from '@lingui/macro'
import {Divider, IconButton, ListItemButton, ListItemText, Stack, Typography} from '@mui/material'
import {useQuery} from '@tanstack/react-query'
import {Fragment} from 'react'
import {DeleteIcon} from 'src/assets/icons'
import {SearchAirportItem} from 'src/shared/types/server'
import {searchCityHistoryQuery} from './searchCityHistory.query'

export interface SearchCityHistoryProps {
  onClick: (data: {label: string; value: string}) => void
  onDelete: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  list?: SearchAirportItem[]
}

export const SearchCityHistory = ({onClick, onDelete, list}: SearchCityHistoryProps) => {
  const {data} = useQuery(['SearchCityHistoryQuery'], searchCityHistoryQuery)

  return (
    <>
      {list ? null : (
        <Stack mt={1} px={2} flexDirection="row" justifyContent="space-between" bgcolor="grey.100">
          <Typography py={1} variant="subtitle1">
            <Trans>Search history</Trans>
          </Typography>
          <IconButton size="small" onClick={onDelete}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      )}
      {(list ?? data)?.map((item, i) => (
        <Fragment key={i}>
          <ListItemButton>
            <ListItemText primary={item.result_text} onClick={() => onClick({label: item.result_text, value: item.id})} />
          </ListItemButton>
          <Divider />
        </Fragment>
      ))}
    </>
  )
}
