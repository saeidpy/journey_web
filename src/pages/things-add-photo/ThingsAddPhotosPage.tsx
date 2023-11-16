import {Trans} from '@lingui/macro'
import {LinearProgress as MuiLinearProgress, linearProgressClasses, Stack, styled, Typography} from '@mui/material'
import {useState} from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {useHandleBack} from 'src/shared/layouts/app-layout'
import {Slider} from 'src/shared/slider'
import {createMediaOutOfFile} from 'src/shared/utils/createMedia'
import {toPercentage} from 'src/shared/utils/math'
import {ThingsAddPhotoFooter} from './ThingsAddPhotoFooter'
import {ThingsAddPhotoHeader} from './ThingsAddPhotoHeader'

const LinearProgress = styled(MuiLinearProgress)(({theme}) => ({
  width: '100%',
  height: theme.spacing(2),
  borderRadius: theme.spacing(4),
  [`& .${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.shades['6'],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: theme.spacing(4),
    backgroundColor: theme.palette.success.light,
  },
}))

const BlackScreen = styled(Stack)(({theme}) => ({
  background: theme.palette.black,
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  justifyContent: 'space-between',
  zIndex: theme.zIndex.modal,
}))

const ProgressContainer = styled(Stack)(({theme}) => ({
  background: theme.palette.black,
  color: theme.palette.white,
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: theme.zIndex.modal + 1,
  opacity: 0.7,
}))

export default function ThingsAddPhotosPage() {
  const {id = ''} = useParams<{id: string}>()
  const [progress, setProgress] = useState<number>()
  const files = useLocation()?.state?.files as File[] | null
  const navigate = useNavigate()
  const back = useHandleBack()

  if (!id) {
    navigate({pathname: '/'}, {replace: true})
  }

  if (!files || !files.length) {
    back()
  }

  return (
    <BlackScreen>
      <ThingsAddPhotoHeader />
      {files && files.length ? <Slider list={files.map(createMediaOutOfFile)} /> : null}
      {files && files.length ? <ThingsAddPhotoFooter onProgress={setProgress} files={files} resortId={id} /> : null}
      {progress !== undefined ? (
        <ProgressContainer>
          <LinearProgress
            variant={progress === 0 ? 'indeterminate' : 'determinate'}
            color="primary"
            value={progress || undefined}
            dir="ltr"
          />
          <Typography width="100%" textAlign="left" variant="h3">
            {toPercentage(progress)}
          </Typography>
          <Typography variant="body1">
            <Trans>The picture is uploading</Trans>
          </Typography>
          <Typography variant="body1">
            <Trans>Please wait</Trans>
          </Typography>
        </ProgressContainer>
      ) : null}
    </BlackScreen>
  )
}
