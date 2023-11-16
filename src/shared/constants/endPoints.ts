export const endPoints = {
  member: {
    register: 'member/register',
    verify: 'member/verify',
    password: (id: string) => `member/${id}/password`,
    login: 'member/login',
    logout: 'member/logout',
    restore: {
      password: 'member/restore/password',
    },
    refresh: 'member/refresh',
    username: (id: string) => `member/${id}/username`,
    loginByGoogle: 'member/loginbygoogle',
    loginByEvano: (id: string) => `member/ewano/login/${id}`,
    token: 'member/token',
    profile: {
      self: 'member/profile',
      edit: 'member/profile/edit',
      getOthers: (id: string) => `member/${id}/profile`,
      picture: {
        edit: 'member/profile/picture/edit',
      },
      myTrips: 'member/my_trips',
      feedback: 'member/feedback',
      feedbackType: 'member/feedback/type',
    },
    comments: {
      list: 'member/comments',
      getOthers: (id: string) => `member/${id}/comments`,
    },
    photos: {
      self: `member/media`,
      getOthers: (id: string) => `member/${id}/media`,
    },
    badge: {
      list: 'member/badge',
      getOthers: (id: string) => `member/${id}/badge`,
      guidance: 'member/badge/guidance',
    },
  },
  resort: {
    self: 'resort/',
    detail: {
      self: (resortId: string) => `resort/${resortId}`,
      comment: {
        self: (resortId: string) => `resort/${resortId}/comment`,
        new: (resortId: string) => `resort/${resortId}/comment/new`,
      },
      related: (resortId: string) => `resort/${resortId}/related`,
      media: {
        self: (resortId: string) => `resort/${resortId}/media`,
        new: (resortId: string) => `resort/${resortId}/media/new`,
        delete: (resortId: string, mediaId: string) => `resort/${resortId}/media/${mediaId}/delete`,
      },
      filter: (resortFilterName: string) => `resort/${resortFilterName}/filter`,
      type: (resortType: string) => `resort/${resortType}/`,
      share: (resortId: string) => `resort/${resortId}/share`,
    },
    comment: {
      delete: (commentId: string) => `resort/comment/${commentId}/delete`,
      impression: {
        new: (commentId: string) => `resort/comment/${commentId}/impression/new`,
      },
    },
    add: {
      place: 'resort/add/place',
    },
    tourismEntity: 'resort/tourismEntity/',
    residence: 'resort/residence/',
    restaurant: 'resort/restaurant/',
  },
  province: {
    self: `province/`,
    detail: (provinceId: string) => `province/${provinceId}`,
    city: {
      detail: (cityId: string) => `province/city/${cityId}`,
      mostvisited: 'province/city/mostvisited',
    },
  },
  search: {
    query: {
      term: (searchTerm: string, filter?: string) => `search/query/${searchTerm}?${filter ? `filter=${filter}&` : ''}`,
    },
    click: {
      self: 'search/click',
      airport: 'search/click/airport',
    },
    history: {
      self: 'search/history',
      airport: 'search/history/airport',
    },
    airport: {
      city: {
        term: (searchTerm: string) => `search/airport/city/${searchTerm}`,
      },
    },
  },
  flight: {
    domestic: {
      passenger: 'member/passenger',
      order: 'flight/domestic/order/main',
      orderHotel: 'resort/residence/hotel/order',
      payment: 'flight/domestic/order/supplement',
      search: 'flight/domestic/search',
      book: 'flight/domestic/book',
      validation: 'flight/domestic/validation',
      cheapest: {
        daily: 'flight/domestic/cheapest/daily',
      },
    },
    airport: {
      mostvisited: 'flight/airport/mostvisited',
    },
    cabins: 'flight/cabins',
    tickets: {
      base: 'flight/tickets',
      sort: {
        type: 'flight/tickets/sort/types',
      },
    },
    ages: 'flight/ages',
    genders: 'flight/genders',
    countries: 'flight/countries',
    departure: {
      time: {
        types: 'flight/departure/time/types',
      },
    },
    airline: {
      types: 'flight/airline/types',
    },
  },
  hotel: {
    availability: 'resort/residence/hotel/availability',
    book: 'resort/residence/hotel/book',
    search: {
      hotel: 'resort/residence/hotel/room/search',
      city: 'resort/residence/hotel/city/search',
      click: 'search/click/hotel',
      destination: (searchTerm: string) => `search/residence/query/${searchTerm}`,
      history: 'search/history/hotel',
    },
  },
}
