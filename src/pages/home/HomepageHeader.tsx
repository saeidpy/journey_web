import {Trans} from '@lingui/macro'
import {Stack, styled, Typography} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {LeftArrow, SearchIcon} from 'src/assets/icons'
import {SearchButton} from 'src/shared/button'
import {mobileUI} from 'src/shared/constants'
// import {FilterButtons} from 'src/shared/filterButtons'
import {useHandleBack} from 'src/shared/layouts/app-layout'

interface SearchBarButtonProps {
  defaultText?: string
  hasBack?: boolean
}

export const SearchBarButton = ({defaultText, hasBack}: SearchBarButtonProps) => {
  const navigate = useNavigate()
  const back = useHandleBack()

  const GoToSearchPage = () => {
    if (hasBack) {
      back()
    } else {
      navigate('/search')
    }
  }

  return (
    <SearchButton
      variant="outlined"
      fullWidth
      startIcon={<SearchIcon />}
      endIcon={hasBack ? <LeftArrow /> : undefined}
      onClick={GoToSearchPage}
    >
      <Typography color="shades.5" width="100%" textAlign="left" variant="caption">
        {defaultText ?? <Trans>Where? What?</Trans>}
      </Typography>
    </SearchButton>
  )
}

const StickySearchBarButton = styled(Stack)({
  top: 0,
  zIndex: mobileUI.zIndex.header,
})

export const HomepageHeader = () => {
  return (
    <>
      {/* //todo : After the arrival of APIs, this section will be modified */}

      {/* <FilterButtons /> */}
      <StickySearchBarButton mt={2}>
        <SearchBarButton />
      </StickySearchBarButton>
    </>
  )
}
