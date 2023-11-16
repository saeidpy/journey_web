import {t} from '@lingui/macro'
import {FormControl, Stack, styled, Tooltip, Typography, useTheme} from '@mui/material'
import L, {LatLng, LatLngExpression} from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import {forwardRef, useCallback, useEffect, useId, useState} from 'react'
import {MapContainer, Marker, TileLayer, useMapEvents} from 'react-leaflet'
import Control from 'react-leaflet-custom-control'
import {Location} from 'src/assets/icons'
import {useSnackbar} from 'src/core/snackbar'
import {Button} from '../button'
import {StandardLabel} from './StandartTextField'
import {InputProps} from './types'
const MapBox = styled(MapContainer)(({theme}) => ({
  width: '100%',
  height: theme.spacing(25),
  paddingTop: theme.spacing(4),
}))

const MapButton = styled(Button)(({theme}) => ({
  background: theme.palette.white,
  minWidth: 'auto',
  padding: theme.spacing(0.5),
  border: '2px solid ' + theme.palette.divider,
  borderRadius: theme.spacing(0.5),
  '&:hover': {
    background: theme.palette.shades[1],
  },
}))

type MapProps = {
  onChange: (e: LatLng) => void
  label: string
  id?: string
} & InputProps

type MarkerProps = {
  onChange: (e: LatLng) => void
}

const DefaultIcon = L.icon({
  iconAnchor: L.point(12.5, 41),
  iconUrl: icon,
  shadowUrl: iconShadow,
})

const MyComponent = (props: MarkerProps) => {
  const {onChange} = props
  const [markerPoint, setMarkerPoint] = useState<LatLngExpression | null>(null)
  const {showSnackbar} = useSnackbar()

  const map = useMapEvents({
    click: (e) => {
      setMarkerPoint(e.latlng)
      onChange(e.latlng)
    },
    drag: (e) => {
      setMarkerPoint(e.target.getCenter())
      onChange(e.target.getCenter())
    },
  })

  const getCurrentLocation = useCallback(() => {
    window.navigator.geolocation.getCurrentPosition(
      (loc) => {
        const currentLocation: LatLng = new LatLng(loc.coords.latitude, loc.coords.longitude)
        setMarkerPoint(currentLocation)
        map.setView(currentLocation, 16)
        onChange(currentLocation)
      },
      (err) => {
        console.error('err', err)
        showSnackbar(t`User denied Geolocation.`, {severity: 'error', autoHideDuration: 5000})
      }
    )
  }, [map, onChange, showSnackbar])

  useEffect(() => {
    getCurrentLocation()
  }, [getCurrentLocation])

  return (
    <>
      {markerPoint ? <Marker draggable={false} icon={DefaultIcon} position={markerPoint as LatLngExpression} /> : null}
      <Control position="topright">
        <Tooltip placement="left" title={t`current location`}>
          <MapButton color={'primary'} onClick={() => getCurrentLocation()} variant="contained">
            <Location />
          </MapButton>
        </Tooltip>
      </Control>
    </>
  )
}
export const MapInput = forwardRef(({label, onChange, id, helperText, state: {error, isDirty, invalid}}: MapProps, ref) => {
  const internalId = useId()
  const theme = useTheme()
  const color = !error && isDirty ? 'success' : error ? 'error' : invalid ? 'warning' : undefined

  return (
    <FormControl>
      <StandardLabel htmlFor={id ?? internalId}>{label}</StandardLabel>
      <Stack py={theme.spacing(3)} width={'100%'}>
        <MapBox center={[31.3263474, 40.0422806]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {<MyComponent onChange={onChange} />}
        </MapBox>
      </Stack>
      {helperText && (
        <Typography variant="caption" color={color}>
          {helperText}
        </Typography>
      )}
    </FormControl>
  )
})
