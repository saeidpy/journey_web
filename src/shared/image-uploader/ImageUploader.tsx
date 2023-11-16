import {Trans} from '@lingui/macro'
import {LinearProgress as MuiLinearProgress, linearProgressClasses, Stack, styled, Typography} from '@mui/material'
import 'cropperjs/dist/cropper.css'
import {createRef} from 'react'
import {Cropper, ReactCropperElement, ReactCropperProps} from 'react-cropper'
import {Button} from 'src/shared/button'
import {EmptyFullScreenModal} from 'src/shared/modal'
import {toPercentage} from 'src/shared/utils/math'
type ImageUploaderProps = {
  image: string
  onClose: () => void
  getCropData: BlobCallback
  progress?: number
  options?: ReactCropperProps & React.RefAttributes<HTMLImageElement | ReactCropperElement>
}

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

export const ImageUploader = ({image, onClose, getCropData, progress, options}: ImageUploaderProps) => {
  const cropperRef = createRef<ReactCropperElement>()

  const uploadImage = () => {
    if (cropperRef.current?.cropper) {
      cropperRef.current.cropper.getCroppedCanvas().toBlob(getCropData)
    }
  }

  return (
    <BlackScreen>
      <EmptyFullScreenModal
        close={onClose}
        footer={
          <Button fullWidth variant="contained" color="primary" onClick={uploadImage} disabled={progress !== undefined}>
            <Trans>Upload image</Trans>
          </Button>
        }
      >
        <Cropper
          ref={cropperRef}
          style={{height: '100%', width: '100%'}}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          guides={true}
          {...options}
        />
      </EmptyFullScreenModal>
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
