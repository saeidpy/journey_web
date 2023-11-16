import {t} from '@lingui/macro'
import {IconButton, InputBase, InputBaseProps, Paper, styled} from '@mui/material'
import {Cancel, CircledBack, SearchIcon} from 'src/assets/icons'

type SearchInputProps = {
  hasBack: boolean
  onBack?: () => void
  onClear?: () => void
}

const CustomPaper = styled(Paper)(({theme}) => ({
  boxShadow: 'none',
  backgroundColor: theme.palette.white,
  border: `1px solid ${theme.palette.shades[3]}`,
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  borderRadius: theme.spacing(4),
  padding: theme.spacing(0.5),
}))

const CustomIconButton = styled(IconButton)(({theme}) => ({
  width: 43,
  height: 43,
  padding: 0,
}))

export const SearchInput = ({hasBack, onBack, onClear, ...rest}: InputBaseProps & SearchInputProps) => {
  return (
    <CustomPaper>
      <CustomIconButton type="submit" aria-label="search">
        <SearchIcon width="24px" height="24px" />
      </CustomIconButton>
      <InputBase sx={{ml: 1, flex: 1}} placeholder={t`Where? What?`} {...rest} />
      <CustomIconButton onClick={hasBack ? onBack : onClear} aria-label="menu" type="reset">
        {hasBack ? <CircledBack width="43px" height="43px" /> : <Cancel width="43px" height="43px" />}
      </CustomIconButton>
    </CustomPaper>
  )
}
