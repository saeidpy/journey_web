import {lazy} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {RequireAuth} from 'src/core/auth'
import {RequireBookFlight} from 'src/core/book-flight/RequireBookFlight'
import {RequireBookHotel} from 'src/core/book-hotel/RequireBookHotel'

const ProfilePage = lazy(
  () =>
    import(
      /* webpackChunkName: "profile" */
      'src/pages/profile/ProfilePage'
    )
)

const ProfileFeedbackPage = lazy(
  () =>
    import(
      /* webpackChunkName: "profile-feedback" */
      'src/pages/profile/feedback/ProfileFeedbackPage'
    )
)

const EditProfilePage = lazy(
  () =>
    import(
      /* webpackChunkName: "profile-edit" */
      'src/pages/profile/editProfile/EditProfilePage'
    )
)

const MedalGuidPage = lazy(
  () =>
    import(
      /* webpackChunkName: "medal-guide" */
      'src/pages/profile/guide/MedalGuidePage'
    )
)

const MoneyWalletPage = lazy(
  () =>
    import(
      /* webpackChunkName: "money-wallet" */
      'src/pages/profile/moneyWallet/MoneyWalletPage'
    )
)

const MyTravelsPage = lazy(
  () =>
    import(
      /* webpackChunkName: "my-travels" */
      'src/pages/profile/myTravels/MyTravelsPage'
    )
)

const PointGuidPage = lazy(
  () =>
    import(
      /* webpackChunkName: "point-guide" */
      'src/pages/profile/guide/PointGuidePage'
    )
)

const HomePage = lazy(
  () =>
    import(
      /* webpackChunkName: "home" */
      'src/pages/home/HomePage'
    )
)

const CityPage = lazy(
  () =>
    import(
      /* webpackChunkName: "city" */
      'src/pages/city/CityPage'
    )
)

const CityAttractionsPage = lazy(
  () =>
    import(
      /* webpackChunkName: "city-attractions" */
      'src/pages/city-attractions/CityAttractionsPage'
    )
)

const CityAttractionsFilterPage = lazy(
  () =>
    import(
      /* webpackChunkName: "city-attractions-filter" */
      'src/pages/city-attractions-filter/CityAttractionsFilterPage'
    )
)

const CityMostPopularPage = lazy(
  () =>
    import(
      /* webpackChunkName: "city-most-popular" */
      'src/pages/city-most-popular/CityMostPopularPage'
    )
)

const ThingsPage = lazy(
  () =>
    import(
      /* webpackChunkName: "things" */
      'src/pages/things/ThingsPage'
    )
)

const ThingsPhotosPage = lazy(
  () =>
    import(
      /* webpackChunkName: "things-photos" */
      'src/pages/things-photos/ThingsPhotosPage'
    )
)

const ThingsAddPhotosPage = lazy(
  () =>
    import(
      /* webpackChunkName: "things-add-photos" */
      'src/pages/things-add-photo/ThingsAddPhotosPage'
    )
)

const PlaceExplanationPage = lazy(
  () =>
    import(
      /* webpackChunkName: "place-explanation" */
      'src/pages/place-explanation/PlaceExplanationPage'
    )
)

const AddCommentPage = lazy(
  () =>
    import(
      /* webpackChunkName: "add-comment" */
      'src/pages/add-comment/AddCommentPage'
    )
)

const RelatedListPage = lazy(
  () =>
    import(
      /* webpackChunkName: "related" */
      'src/pages/related/RelatedPage'
    )
)

const AddPlacePage = lazy(
  () =>
    import(
      /* webpackChunkName: "add-place" */
      'src/pages/add-place/AddPlacePage'
    )
)

const SearchResultPage = lazy(
  () =>
    import(
      /* webpackChunkName: "search-result" */
      'src/pages/search/search-result-page/SearchResultPage'
    )
)

const SearchPage = lazy(
  () =>
    import(
      /* webpackChunkName: "search" */
      'src/pages/search/search-page/SearchPage'
    )
)

const FlightPage = lazy(
  () =>
    import(
      /* webpackChunkName: "flight" */
      'src/pages/flight/FlightPage'
    )
)

const FlightSearchResultPage = lazy(
  () =>
    import(
      /* webpackChunkName: "search-flight-result" */
      'src/pages/search-flight-result/SearchFlightResultPage'
    )
)

const FlightTicketInfoPage = lazy(
  () =>
    import(
      /* webpackChunkName: "flight-ticket-info" */
      'src/pages/flight-ticket-info/FlightTicketInfoPage'
    )
)

const FlightPassengerInfoPage = lazy(
  () =>
    import(
      /* webpackChunkName: "flight-passenger-info" */
      'src/pages/flight-passenger-info/FlightPassengerInfoPage'
    )
)
const FlightFinalCheckPage = lazy(
  () =>
    import(
      /* webpackChunkName: "flight-final-check" */
      'src/pages/flight-final-check/FlightFinalCheckPage'
    )
)

const TermsPage = lazy(
  () =>
    import(
      /* webpackChunkName: "term" */
      'src/pages/term/TermsPage'
    )
)

const HotelPage = lazy(
  () =>
    import(
      /* webpackChunkName: "hotel" */
      'src/pages/hotel/HotelPage'
    )
)

const HotelSearchResultPage = lazy(
  () =>
    import(
      /* webpackChunkName: "hotel" */
      'src/pages/hotel-search/HotelSearchResultPage'
    )
)

const HotelPassengers = lazy(
  () =>
    import(
      /* webpackChunkName: "hotel" */
      'src/pages/hotel-passengers/HotelPassengers'
    )
)

const HotelPassengersCheck = lazy(
  () =>
    import(
      /* webpackChunkName: "hotel" */
      'src/pages/hotel-passengers-check/HotelPassengersCheck'
    )
)

const HotelDetailsPage = lazy(
  () =>
    import(
      /* webpackChunkName: "hotel" */
      'src/pages/hotel-details/HotelDetailsPage'
    )
)

const HotelOrderDetail = lazy(
  () =>
    import(
      /* webpackChunkName: "hotel" */
      'src/pages/hotel-order-detail/HotelOrderDetail'
    )
)

const OtpPage = lazy(
  () =>
    import(
      /* webpackChunkName: "otp" */
      'src/pages/auth/otp/OtpPage'
    )
)
export function MainRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<HomePage />} />
        <Route path="search">
          <Route index element={<SearchPage />} />
          <Route path="search-result" element={<SearchResultPage />} />
        </Route>
        <Route path="city/:id">
          <Route index element={<CityPage />} />
          <Route path="attractions">
            <Route index element={<CityAttractionsPage />} />
            <Route path="filter" element={<CityAttractionsFilterPage />} />
            <Route path="most-popular" element={<CityMostPopularPage />} />
          </Route>
          {/* <Route path="info" element={<CityInfoPage />} /> */}
        </Route>
        <Route path="things/:id">
          <Route index element={<ThingsPage />} />
          <Route path="things-photos" element={<ThingsPhotosPage />} />
          <Route path="things-explanation" element={<PlaceExplanationPage />} />
          <Route path="related-location" element={<RelatedListPage />} />
        </Route>
        <Route path="profile/:id" element={<ProfilePage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route element={<RequireAuth />}>
          <Route path="flight" element={<RequireBookFlight />}>
            <Route index element={<FlightPage />} />
            <Route path="search-flight-result" element={<FlightSearchResultPage />} />
            <Route path="flight-information" element={<FlightTicketInfoPage />} />
            <Route path="return-flight-information" element={<FlightTicketInfoPage />} />
            <Route path="passengers-info" element={<FlightPassengerInfoPage />} />
            <Route path="final-check" element={<FlightFinalCheckPage />} />
          </Route>

          <Route path="hotel" element={<RequireBookHotel />}>
            <Route index element={<HotelPage />} />
            <Route path="search-result" element={<HotelSearchResultPage />} />
            <Route path="hotel-information" element={<HotelPassengers />} />
            <Route path="hotel-information-check" element={<HotelPassengersCheck />} />
            <Route path="hotel-details/:id" element={<HotelDetailsPage />} />
            <Route path="hotel-order-detail-loading" element={<HotelOrderDetail type="loading" />} />
            <Route path="hotel-order-detail-paymentPending" element={<HotelOrderDetail type="paymentPending" />} />
            <Route path="hotel-order-detail-reject" element={<HotelOrderDetail type="reject" />} />
            <Route path="hotel-order-detail-success" element={<HotelOrderDetail type="success" />} />
          </Route>

          <Route path="profile">
            <Route index element={<ProfilePage />} />
            <Route path="feedback" element={<ProfileFeedbackPage />} />
            <Route path="edit" element={<EditProfilePage />} />
            <Route path="guide-point" element={<PointGuidPage />} />
            <Route path="guide-medal" element={<MedalGuidPage />} />
            <Route path="money-wallet" element={<MoneyWalletPage />} />
            <Route path="my-travels" element={<MyTravelsPage />} />
          </Route>
          <Route path="things/:id">
            <Route path="add-photo" element={<ThingsAddPhotosPage />} />
            <Route path="add-comment" element={<AddCommentPage />} />
          </Route>
          <Route path="add-place" element={<AddPlacePage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />

      <Route path="otp" element={<OtpPage />} />
    </Routes>
  )
}
