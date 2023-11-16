import {i18n} from '@lingui/core'
import {defineMessage} from '@lingui/macro'
import {Flight} from 'src/shared/types/server'

defineMessage({id: 'ticket-type-charter'})
defineMessage({id: 'ticket-type-systemic'})

defineMessage({id: 'cabin-type-business'})
defineMessage({id: 'cabin-type-economy'})
defineMessage({id: 'cabin-type-premium_economy'})

export const getTags = (flight: Flight) => {
  return [
    flight?.cabin_type?.[1]?.[1] ?? flight?.cabin_type?.[0] ? i18n._(`cabin-type-${flight.cabin_type[0]}`) : null,
    flight?.ticket_type?.[1]?.[1] ?? flight?.ticket_type?.[0] ? i18n._(`ticket-type-${flight.ticket_type[0]}`) : null,
    flight?.airline?.[1]?.[1],
  ].filter((i) => i) as string[]
}
