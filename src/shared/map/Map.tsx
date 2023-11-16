import {Stack, styled} from '@mui/material'
import L, {LatLngExpression} from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import {MapContainer, Marker, TileLayer} from 'react-leaflet'

type MapGeoProps = {
  lat: number
  lng: number
  name?: string
}

const DefaultIcon = L.icon({
  iconAnchor: L.point(12.5, 41),
  iconUrl: icon,
  shadowUrl: iconShadow,
})

const MapBox = styled(MapContainer)(({theme}) => ({
  position: 'relative',
  width: '100%',
  height: theme.spacing(25),
  paddingTop: theme.spacing(4),

  '* .leaflet-control-attribution': {
    display: 'none !important',
  },
}))

const StyledNav = styled('div')({
  position: 'absolute',
  zIndex: 1000,
  bottom: 4,
  left: 7,
  background: 'white',
  padding: '1px 5px',
  borderRadius: 4,
  fontFamily: 'Vazirmatn UI FD',
  fontSize: 'initial',
  cursor: 'pointer',
  border: '2px solid rgba(0,0,0,0.2)',
  backgroundClip: 'padding-box',
})

export const Map = (props: MapGeoProps) => {
  const {lat, lng, name} = props

  const gotoMap = () => {
    window.location.href = `geo:0,0?q=${lat},${lng}(${name})`
    // window.location.href = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}` // only googlemap - better suport
  }

  return (
    <Stack pb={4} pt={1} width="100%">
      <MapBox center={[props.lat, props.lng]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {<Marker draggable={false} icon={DefaultIcon} position={{lat: props.lat, lng: props.lng} as LatLngExpression} />}
        <StyledNav onClick={gotoMap}>مسیر یاب</StyledNav>
      </MapBox>
    </Stack>
  )
}
