import {useMutation} from '@tanstack/react-query'
import {useEffect} from 'react'
import {paymentEvano} from './paymentEvano.mutation'
const useEwanoFunction = () => {
  const {mutateAsync: paymentEvanoMutaiton} = useMutation(paymentEvano)
  const showSuccess = (message: any) => {
    //todo : show ticket and passanger information
  }
  const ewanoFunction = (ewanoOrderId: string, total_price: string, sessionId: string, ticket_unique_hash: string) => {
    if (window.ewano) {
      const stautsRes = window.ewano.pay(total_price, ewanoOrderId, '/')
      window.ewano.paymentResult = () => {}
      const dataToPostPayment = {
        session_id: sessionId,
        ticket_unique_hash: ticket_unique_hash,
        ewano_order_id: ewanoOrderId,
      }
      paymentEvanoMutaiton(dataToPostPayment).then((res) => {
        //todo
        //console.log(res)
        //showSuccess(message)
      })
    }
  }

  return ewanoFunction
}
export const EwanoComponent = (ewanoOrderId: string, total_price: string, sessionId: string, ticket_unique_hash: string) => {
  const ewanoFunction = useEwanoFunction()
  useEffect(() => {
    ewanoFunction(ewanoOrderId, total_price, sessionId, ticket_unique_hash)
  }, [ewanoOrderId, total_price, sessionId, ticket_unique_hash])
}
