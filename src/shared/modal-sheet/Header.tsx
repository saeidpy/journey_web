import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {Grid, IconButton, Typography, useTheme} from '@mui/material'
import React from 'react'

type HeaderProps = {
  onClose: () => void
  title: string
  actionHeader?: React.ReactNode
}

export const Header = ({onClose, title, actionHeader}: HeaderProps) => {
  const theme = useTheme()
  return (
    <Grid
      container
      alignItems={'center'}
      justifyContent="space-between"
      padding={theme.spacing(2, 1)}
      borderBottom={'1px solid ' + theme.palette.divider}
    >
      <Grid item xs={2}>
        <IconButton onClick={onClose} size={'small'}>
          <ExpandMoreIcon fontSize="medium" />
        </IconButton>
      </Grid>
      <Grid item xs={6} textAlign="center">
        <Typography variant="h6">{title}</Typography>
      </Grid>
      <Grid item xs={2}>
        {actionHeader}
      </Grid>
    </Grid>
  )
}
