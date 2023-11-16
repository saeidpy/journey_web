import {GeoPointResponse, LocationGeoPointResponse, LocationResponse} from 'src/shared/types/server'

export const getGeoPointFromLocationResponse = (location?: LocationResponse | null) => {
  if (!location) {
    return location
  }
  let geoPoint = location.geo_point as LocationGeoPointResponse
  while (geoPoint.geo_point) {
    geoPoint = geoPoint.geo_point as LocationGeoPointResponse
  }
  return geoPoint as unknown as GeoPointResponse
}
