import {t, Trans} from '@lingui/macro'
import {Stack} from '@mui/material'
import {Suspense} from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {useNavigate} from 'react-router-dom'
import {Button} from 'src/shared/button'
import {HeaderAndShowAll} from 'src/shared/horizontal-scrollable'
import {FullScreenLoading} from 'src/shared/loading'
import {ResortResponseItem} from 'src/shared/types/server'
import {ThingsComments} from '../things/ThingsComments'

type HotelCommentSectionType = {
  data: ResortResponseItem
}
export const HotelCommentSection = ({data}: HotelCommentSectionType) => {
  const navigate = useNavigate()
  return (
    <>
      <Stack justifyContent="space-between">
        <HeaderAndShowAll title={t`Comments`} showAll={() => {}} />
      </Stack>
      <ErrorBoundary fallback={<></>}>
        <Suspense fallback={<FullScreenLoading />}>
          <ThingsComments />
        </Suspense>
      </ErrorBoundary>

      <Stack mt={3} mb={2}>
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => {
            navigate(`/things/${data.resort_id}/add-comment`, {
              state: {
                data,
              },
            })
          }}
        >
          <Trans>Add comment</Trans>
        </Button>

        {/* <Divider sx={{marginTop: '30px'}} /> */}
      </Stack>
    </>
  )
}
