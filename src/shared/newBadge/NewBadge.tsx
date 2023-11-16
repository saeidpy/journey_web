import {Trans} from '@lingui/macro'
import {Stack, Typography, useTheme} from '@mui/material'
import {useQueryClient} from '@tanstack/react-query'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {LeftArrow} from 'src/assets/icons'
import {medalAwardJpg} from 'src/assets/img'
import {Button} from 'src/shared/button'
import {EmptyFullScreenModal} from 'src/shared/modal'

type INewBadge = {
  close: () => void
  medalName: string
  memberName: string
}
export const NewBadge = ({close, medalName, memberName}: INewBadge) => {
  const queryClient = useQueryClient()
  useEffect(() => {
    queryClient.invalidateQueries({queryKey: ['pointsSection', '']})
    queryClient.invalidateQueries({queryKey: ['ProfilePage', '']})
  }, [queryClient])
  const theme = useTheme()
  const navigate = useNavigate()

  const child = (
    <Stack justifyContent={'center'} alignItems={'center'}>
      <Stack justifyContent={'center'} alignItems={'center'}>
        <img src={medalAwardJpg} alt={medalAwardJpg} width={240} />
      </Stack>
      <Stack py={1}>
        <Typography variant="h5" color={theme.palette.white}>
          {medalName}
        </Typography>
      </Stack>
      <Stack py={2} justifyContent={'center'} alignItems={'center'}>
        <Typography variant="h4" color={theme.palette.white}>
          {`آفرین (${memberName})!`}
        </Typography>
        <Typography variant="h5" color={theme.palette.white}>
          نشان جدید برای شما باز شد
        </Typography>
      </Stack>
      <Stack py={3} justifyContent={'center'} alignItems={'center'}>
        <Button
          variant="contained"
          color={'primary'}
          endIcon={<LeftArrow />}
          onClick={() => {
            navigate('/profile/guide-medal', {replace: true})
          }}
        >
          <Trans>More information</Trans>
        </Button>
      </Stack>
    </Stack>
  )
  return <EmptyFullScreenModal close={close}>{child}</EmptyFullScreenModal>
}
