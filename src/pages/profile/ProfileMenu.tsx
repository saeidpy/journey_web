import {t} from '@lingui/macro'
import {Grid, Stack, styled, Typography} from '@mui/material'
import {ReactNode} from 'react'
import {useNavigate} from 'react-router-dom'
import {LeftArrow, User} from 'src/assets/icons'
import {Button} from 'src/shared/button'
// import {Bag,MoneyWalletOpen} from 'src/assets/icons'
type ItemMenuProps = {
  icon: ReactNode
  title: string
  onClick: () => void
}
const Wrapper = styled(Stack)(({theme}) => ({
  borderTop: `1px solid ${theme.palette.shades[3]}`,
  borderBottom: `1px solid ${theme.palette.shades[3]}`,
}))

const ListItem = styled(Button)(({theme}) => ({
  padding: theme.spacing(2, 0),
}))

const ItemMenu = ({icon, onClick, title}: ItemMenuProps) => {
  return (
    <>
      <ListItem fullWidth variant="text" onClick={onClick}>
        <Grid container spacing={1}>
          <Grid item xs={1}>
            {icon}
          </Grid>
          <Grid item xs={10} textAlign="left">
            <Typography variant="body1" color="shades.9">
              {title}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <LeftArrow />
          </Grid>
        </Grid>
      </ListItem>
    </>
  )
}
export const ProfileMenu = () => {
  const navigate = useNavigate()
  return (
    <Wrapper>
      <ItemMenu title={t`Edit profile`} icon={<User />} onClick={() => navigate('/profile/edit')} />
      {/* //todo : After the arrival of APIs, this section will be modified */}
      {/* <ItemMenu
        title={t`Money wallet`}
        icon={<MoneyWalletOpen />}
        onClick={() => {
          navigate('/profile/money-wallet')
        }}
      />
      <ItemMenu
        title={t`My travels`}
        icon={<Bag />}
        onClick={() => {
          navigate('/profile/my-travels')
        }}
      /> */}
      {/* <ItemMenu title={t`Support`} icon={<HeadphonesCustomerSupport />} onClick={() => {}} />
       */}
    </Wrapper>
  )
}
