import {Trans} from '@lingui/macro'
import {Grid, styled} from '@mui/material'
import {useMutation} from '@tanstack/react-query'
import {ReactNode} from 'react'
import {WhiteClose} from 'src/assets/icons'
import {uploadThingsPhotoMutation} from 'src/pages/things-photos/thingsPhotosUpload.mutation'
import {Button} from 'src/shared/button'

interface IBackground {
  children: ReactNode
}

interface IModal {
  children: ReactNode
  UserInfo: ReactNode
  close: () => void
  dataToPost?: dataToPostProps
  resortId?: string
}

export interface dataToPostProps {
  image_1: Blob
  member_id: string
}

interface IEmptyModal {
  children: ReactNode
  close: () => void
  footer?: ReactNode
}

const BackgroundWrapper = styled('div')(({theme}) => ({
  flexDirection: 'column',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: 'rgba(0, 0, 0, 1)',
  zIndex: theme.zIndex.modal,
}))

const HeaderWrapper = styled('div')(({theme}) => ({
  display: 'flex',
  // flexWrap: 'wrap',
  width: '100%',
  height: 'fit-content',
  padding: theme.spacing(2),
}))

const FooterWrapper = styled('div')(({theme}) => ({
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
  height: 'fit-content',
  padding: theme.spacing(3, 2),
}))

const UserInfoBox = styled('div')({
  flex: 3,
})

const CloseButtonBox = styled('div')({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
})

const ContentBox = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
})

const Background = ({children}: IBackground) => <BackgroundWrapper>{children}</BackgroundWrapper>

export const FullScreenModalForAddingPhoto = ({children, UserInfo, close, dataToPost, resortId}: IModal) => {
  const {mutate} = useMutation(uploadThingsPhotoMutation)
  const uploadImage = () => {
    const formData = new FormData()
    formData.append('image_1', dataToPost?.image_1 as Blob)
    formData.append('member_id', dataToPost?.member_id as string)

    mutate({resortId: resortId as string, data: formData})
  }
  return (
    <Background>
      <HeaderWrapper>
        <UserInfoBox>{UserInfo}</UserInfoBox>
        <CloseButtonBox>
          <WhiteClose onClick={close as () => void} />
        </CloseButtonBox>
      </HeaderWrapper>
      <ContentBox>{children}</ContentBox>
      <FooterWrapper>
        <Button fullWidth variant="contained" color="primary" onClick={uploadImage}>
          <Trans>Upload image</Trans>
        </Button>
      </FooterWrapper>
    </Background>
  )
}

export const FullScreenModalForSlider = ({children, UserInfo, close}: IModal) => {
  return (
    <Background>
      <HeaderWrapper>
        <UserInfoBox>{UserInfo}</UserInfoBox>
        <CloseButtonBox>
          <WhiteClose onClick={close} />
        </CloseButtonBox>
      </HeaderWrapper>
      <ContentBox>{children}</ContentBox>
      <FooterWrapper>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            {/* <Like /> */}
          </Grid>
          <Grid item xs={7} color={'white'}>
            {/* <ShareOutlined /> */}
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </FooterWrapper>
    </Background>
  )
}

export const EmptyFullScreenModal = ({children, footer, close}: IEmptyModal) => {
  return (
    <Background>
      <HeaderWrapper>
        <CloseButtonBox>
          <WhiteClose onClick={close} />
        </CloseButtonBox>
      </HeaderWrapper>
      <ContentBox>{children}</ContentBox>
      {footer && <FooterWrapper>{footer}</FooterWrapper>}
    </Background>
  )
}
