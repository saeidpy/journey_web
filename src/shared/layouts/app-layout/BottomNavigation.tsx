import {t} from '@lingui/macro'
import {Home, Person} from '@mui/icons-material'
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined'
import {BottomNavigation as MuiBottomNavigation, BottomNavigationAction as MuiBottomNavigationAction, styled} from '@mui/material'
import {useLocation, useNavigate} from 'react-router-dom'
const BOTTOM_ROUTES = ['profile', '', 'add-place']

const BottomNavigationAction = styled(MuiBottomNavigationAction)(({theme}) => ({
  ...theme.typography?.subtitle1,
  whiteSpace: 'nowrap',
  '&.Mui-selected .MuiBottomNavigationAction-label.Mui-selected': {
    ...theme.typography?.subtitle1,
    fontWeight: 500,
    color: theme.palette.main['primary3'],
  },
  color: theme.palette.shades['6.5'],
}))

export function BottomNavigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const value =
    location.pathname === '/'
      ? BOTTOM_ROUTES.findIndex((item) => item === '')
      : BOTTOM_ROUTES.findIndex((item) => item !== '' && location.pathname.startsWith(`/${item}`))

  return (
    <MuiBottomNavigation
      showLabels
      value={value > -1 ? value : 1}
      onChange={(_, newValue) => {
        navigate({pathname: `/${BOTTOM_ROUTES[newValue]}`})
      }}
    >
      <BottomNavigationAction label={t`Profile`} icon={<Person />} />
      <BottomNavigationAction label={t`Home`} icon={<Home />} />
      <BottomNavigationAction label={t`New Location`} icon={<SignpostOutlinedIcon />} />
    </MuiBottomNavigation>
  )
}
