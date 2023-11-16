import {Profile} from 'src/shared/types/server'

export const getProfileName = (user?: Profile | null) => user?.name || user?.user_name || user?.email || user?.phone_number
