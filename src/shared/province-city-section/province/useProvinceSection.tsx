import {useQuery} from '@tanstack/react-query'
import {useId} from 'react'
import {useFormContext} from 'react-hook-form'
import {ProvinceCityInputType} from 'src/shared/types/server'

import {getProvincesQuery} from './province.query'

function useProvinceSection() {
  const {control} = useFormContext<ProvinceCityInputType>()
  const {data: options, isFetching} = useQuery(['ProvinceSection'], getProvincesQuery, {
    refetchOnWindowFocus: false,
  })
  const internalId = useId()
  return {control, options, isFetching, internalId}
}

export default useProvinceSection
