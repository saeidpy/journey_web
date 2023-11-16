import {endPoints} from 'src/shared/constants'
import {axiosWithAuth} from 'src/shared/utils/axios'

export const paymentEvano = async (postData: any) => {
  return axiosWithAuth.post(endPoints.flight.domestic.payment, postData).then((data) => data.data.data?.result)
}

// axiosWithAuth

// const {mutateAsync: logoutMutate} = useMutation(logoutMutation)

// const logout = async () => {
//   logoutMutate().then((res) => {
//     localStorage.removeItem(StorageKeys.authData)
//     //navigate('/login')
//     window.location.href = '/login'
//   })
// }

// const handleFormSubmit = (data: any) => {
//     const dataToPost: DataToPostType = {
//       number_of_requested_sim_cards: Number(data.number_of_requested_sim_cards),
//     }

//     mutateAsync(dataToPost).then((res) => {
//       if (res?.result) handleSubmitDone()
//     })
//   }
