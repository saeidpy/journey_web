import {Trans} from '@lingui/macro'
import {Button, Stack, styled, Typography} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {LocationPlus} from 'src/assets/icons'
import {SearchItem} from './SearchItem'

const NoContentItem = styled(SearchItem)(({theme}) => ({
  padding: theme.spacing(3.5, 0, 4),
}))

const CustomButton = styled(Button)(({theme}) => ({
  background: theme.palette.main.primary3,
  padding: theme.spacing(1, 4),
  width: 'fit-content',
  margin: 'auto',
  '&:hover': {
    background: theme.palette.primary.main,
  },
}))

type NoDataContentSectionProps = {
  searchTerm: string
}

export const NoDataContentSection = ({searchTerm}: NoDataContentSectionProps) => {
  const navigate = useNavigate()
  return (
    <Stack width="100%">
      <NoContentItem>
        <Typography>
          <b>
            <Trans>No result found for «{searchTerm}».</Trans>
          </b>
        </Typography>
      </NoContentItem>
      <Stack pt={4} pb={2} alignItems="center">
        <Trans>Do you know a place that is not here?</Trans>
      </Stack>
      <Stack width="100%" pt={2}>
        <CustomButton
          endIcon={<LocationPlus />}
          variant="contained"
          onClick={() => {
            navigate({pathname: '/add-place'})
          }}
        >
          <Trans>Add a missing place</Trans>
        </CustomButton>
      </Stack>
    </Stack>
  )
}
