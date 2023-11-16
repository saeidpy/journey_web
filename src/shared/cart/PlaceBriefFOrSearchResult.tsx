import {t, Trans} from '@lingui/macro'
import {Menu, MenuItem, Stack} from '@mui/material'
import {useMutation} from '@tanstack/react-query'
import {MouseEvent, useState} from 'react'
import {DotMenu} from 'src/assets/icons'
import {useSnackbar} from 'src/core/snackbar'
import {Button} from 'src/shared/button'
import {mobileUI} from 'src/shared/constants'
import {Rate} from 'src/shared/rate'
import {shareMutation} from 'src/shared/slider-container'
import {TextEllipse} from '../typography'
import {Image} from './Image'

export interface CartProps {
  resortId: string
  imageUrl: string
  name: string
  description?: string
  rate?: number
  rateCount?: number
}

export const PlaceBriefFOrSearchResult = ({imageUrl, name, description, resortId, rate, rateCount}: CartProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const {mutateAsync, isLoading} = useMutation(shareMutation)
  const {showSnackbar} = useSnackbar()
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(null)
  }
  const handleShare = (event: MouseEvent<HTMLElement>) => {
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
    <Stack>
      <Stack position={'relative'}>
        <Image alt={name} src={imageUrl} />
        <Button
          variant="contained"
          sx={{
            width: '30px',
            height: '30px',
            borderRadius: '30px',
            position: 'absolute',
            top: 10,
            right: 10,
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
          <DotMenu />
          {/* <img src={DotMenu as unknown as string} alt="menu" width="24px" height="24px" /> */}
        </Button>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem onClick={handleShare} disabled={isLoading}>
            <Trans>Share</Trans>
          </MenuItem>
          {/* <MenuItem onClick={handleClose}>
            <Trans>Add to my favorite</Trans>
          </MenuItem> */}
        </Menu>
      </Stack>
      <Stack>
        {name ? (
          <TextEllipse variant="body1" mt={1} mb={0.5} color="shades.8">
            {name}
          </TextEllipse>
        ) : null}
        {rate && rateCount ? <Rate count={rateCount} rate={rate} /> : null}
        {description ? (
          <TextEllipse variant="caption" color="shades.6" clamp={2} mt={rate && rateCount ? 1 : 0.5}>
            {description}
          </TextEllipse>
        ) : null}
      </Stack>
    </Stack>
  )
}
