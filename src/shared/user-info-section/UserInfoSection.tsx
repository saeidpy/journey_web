import {Grid, Stack, styled, Typography, useTheme} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {profileJpg} from 'src/assets/img'

const ProfileImage = styled('img')(({theme}) => ({
  width: theme.spacing(5),
  height: theme.spacing(5),
  borderRadius: theme.spacing(8),
}))

export interface UserInfoSectionProps {
  imageUrl?: string
  name?: string
  subtitle?: string
  theme?: 'dark' | 'light'
  userId: string
}
export const UserInfoSection = ({subtitle, imageUrl, name, theme: themeColor = 'dark', userId}: UserInfoSectionProps) => {
  const theme = useTheme()
  const navigate = useNavigate()
  return (
    <Grid container spacing={2} alignItems={'center'}>
      <Grid item display={'flex'}>
        <ProfileImage
          src={imageUrl || profileJpg}
          onClick={() => {
            navigate({pathname: `/profile/${userId}`})
          }}
        />
      </Grid>
      <Grid item display={'flex'}>
        <Stack height={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'} alignItems={'flex-start'}>
          <Stack>
            {name ? (
              <Typography variant="h3" color={themeColor === 'light' ? theme.palette.shades[1] : theme.palette.shades[8]}>
                {name}
              </Typography>
            ) : null}
          </Stack>
          <Stack>
            {subtitle ? (
              <Typography variant="subtitle1" color={themeColor === 'light' ? theme.palette.shades[1] : theme.palette.shades[5]}>
                {subtitle}
              </Typography>
            ) : null}
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  )
}
