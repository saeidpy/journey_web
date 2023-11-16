import {t, Trans} from '@lingui/macro'
import {ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, styled} from '@mui/material'
import {useMutation} from '@tanstack/react-query'
import {MouseEvent as ReactMouseEvent, useState} from 'react'
import DotMenu from 'src/assets/icons/dotMenu.svg'
import {useUserProfile} from 'src/core/auth'
import {useSnackbar} from 'src/core/snackbar'
import {Button} from 'src/shared/button'
import {mobileUI} from 'src/shared/constants'
import {Slider} from 'src/shared/slider'
import {MediaResponse} from 'src/shared/types/server'
import {shouldForwardProp} from 'src/shared/utils/shouldForwardProp'
import {spacingToNumber} from 'src/shared/utils/spacingToNumber'
import {shareMutation} from './share.mutation'

export type SlideContainerProps = {
  list?: MediaResponse[]
  noPadding?: boolean
  isRounded?: boolean
  onClick?: () => void
  resortId?: string
  initialSlide?: number
  media_count?: number
  urlList?: string[]
}

const RoundedWrapper = styled('div')({
  // width: 'calc(100vw - 32px)',
  maxWidth: mobileUI.shared.maxWidth - 32,
  height: 'calc((100vw - 32px) * 0.741)',
  maxHeight: (mobileUI.shared.maxWidth - 32) * 0.741,
  borderRadius: '10px',
  position: 'relative',
  overflow: 'hidden',
})

const FlatWrapper = styled('div', {shouldForwardProp})<{noPadding?: boolean}>(({theme, noPadding}) => ({
  width: noPadding ? '100%' : `calc(100vw - ${theme.spacing(4)})`,
  // maxWidth: mobileUI.shared.maxWidth - (noPadding ? 0 : spacingToNumber(theme.spacing(4))),
  maxWidth: '100%',
  height: `calc(${noPadding ? '100vw' : `(100vw - ${theme.spacing(4)})`} * 0.741)`,
  maxHeight: (mobileUI.shared.maxWidth - (noPadding ? 0 : spacingToNumber(theme.spacing(4)))) * 0.741,
  position: 'relative',
  margin: '0 auto',
}))
export const FlatFullWidthSlideContainer = ({noPadding, onClick, ...otherProps}: SlideContainerProps) => {
  return (
    <FlatWrapper noPadding={noPadding} onClick={onClick}>
      <Slider {...otherProps} />
    </FlatWrapper>
  )
}

export const RoundedSlideContainer = (props: SlideContainerProps) => {
  const {user} = useUserProfile()
  // console.log('🚀 ~ file: SliderContainer.tsx:53 ~ RoundedSlideContainer ~ user:', user)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const {showSnackbar} = useSnackbar()
  const {mutateAsync, isLoading} = useMutation(shareMutation)
  const open = Boolean(anchorEl)

  const handleClick = (event: ReactMouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (event: MouseEvent | TouchEvent) => {
    event.stopPropagation()
    setAnchorEl(null)
  }

  const handleShare = (resortId: string, event: ReactMouseEvent<HTMLElement>) => {
    event.stopPropagation()
    mutateAsync({resortId})
      .then((res) => {
        if (res) {
          navigator.clipboard.writeText(res)
          showSnackbar(t`Link copied to clipboard.`)
        }
      })
      .finally(() => {
        setAnchorEl(null)
      })
  }
  return (
    <>
      <RoundedWrapper>
        <Slider {...props} />
      </RoundedWrapper>
      {user?.member_id && (
        <>
          <Button
            variant="contained"
            sx={{
              width: '40px',
              height: '40px',
              borderRadius: '40px',
              position: 'absolute',
              top: 20,
              right: 20,
              backgroundColor: 'white',
              padding: 0,
              minWidth: 0,
              minHeight: 0,
              zIndex: mobileUI.zIndex.backButton,
            }}
            id="demo-positioned-button"
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <img src={DotMenu} alt="menu" width="24px" height="24px" />
          </Button>
          <Popper open={open} anchorEl={anchorEl} transition placement="auto-end">
            {({TransitionProps, placement}) => (
              <Grow {...TransitionProps} style={{transformOrigin: placement}}>
                <Paper>
                  <ClickAwayListener touchEvent="onTouchStart" onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow">
                      <MenuItem
                        disabled={isLoading}
                        onClick={(e: ReactMouseEvent<HTMLElement>) => {
                          handleShare(props.resortId ?? '', e)
                        }}
                      >
                        <Trans>Share</Trans>
                      </MenuItem>
                      {/* <MenuItem onClick={handleClose}>
                        <Trans>Add to my favorite</Trans>
                      </MenuItem> */}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </>
      )}
    </>
  )
}
