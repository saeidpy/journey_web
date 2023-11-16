import {UserContextRealValues} from 'src/core/auth'
import {Auth, Profile} from 'src/shared/types/server'
export const authResponseToContext = (data: Auth, user?: Profile) => {
  const returnContext: UserContextRealValues = {
    token: data.access_token,
    tokenType: 'Bearer',
    refreshToken: data.refresh_token,
    tokenExpireTimestamp: JSON.parse(window.atob(data.access_token.split('.')[1])).exp * 1000,
  }
  if (user) {
    returnContext.user = user
  }
  return returnContext
}
