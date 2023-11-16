import {Trans} from '@lingui/macro'
import {Divider, IconButton, ListItemButton, ListItemText, Stack, Typography} from '@mui/material'
import {useQuery} from '@tanstack/react-query'
import {Fragment} from 'react'
import {DeleteIcon} from 'src/assets/icons'
import {SearchHotelItem} from 'src/shared/types/server'
import {HotelInputType} from '../HotelPage'
import {searchHotelHistoryQuery} from './searchHotelHistory.query'

export interface SearchHotelHistoryProps {
  onClick: (data: HotelInputType['destination']) => void
  onDelete: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  list?: SearchHotelItem[]
}

export const SearchHotelHistory = ({onClick, onDelete, list}: SearchHotelHistoryProps) => {
  const {data} = useQuery(['SearchHotelHistoryQuery'], searchHotelHistoryQuery)

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
            <ListItemText
              primary={item.result_text}
              onClick={() => onClick({label: item.result_text, value: item.id, type: item.entity_type})}
            />
          </ListItemButton>
          <Divider />
        </Fragment>
      ))}
    </>
  )
}
