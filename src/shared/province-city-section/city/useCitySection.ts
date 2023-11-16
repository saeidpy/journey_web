import {useQuery} from '@tanstack/react-query'
import {useEffect, useId} from 'react'
import {useController, useFormContext} from 'react-hook-form'
import {ProvinceCityInputType} from 'src/shared/types/server'
import {getCitiesByProvinceIdQuery} from './city.query'

function useCitySection() {
  const internalId = useId()
  const {control, watch} = useFormContext<ProvinceCityInputType>()
  const provinceInput = watch('province')
  const provinceId = provinceInput?.province_id?.toString() ?? ''
  const {data: options = [], isFetching} = useQuery(['CitySection', provinceId], getCitiesByProvinceIdQuery, {
    refetchOnWindowFocus: false,
    suspense: false,
    enabled: Boolean(provinceId),
  })

  const {field} = useController({
    name: 'city',
    control,
  })

  useEffect(() => {
    const valueIsExistInOptions = options.find((options) => options.city_id === field.value?.city_id)
    if ((options.length && !valueIsExistInOptions) || (!provinceId && field.value?.city_id)) {
      field.onChange(null)
    }
  }, [options, field, provinceId])

  return {internalId, isFetching, provinceId, control, options}
}

export default useCitySection
