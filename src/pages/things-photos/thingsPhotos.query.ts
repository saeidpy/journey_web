import {QueryFunctionContext} from '@tanstack/react-query'
import {endPoints} from 'src/shared/constants'
import {simpleAxios} from 'src/shared/utils/axios'
export const getResortPhotosQueryFn = async ({
  queryKey: [_, resortId],
  signal,
  pageParam = 0,
}: QueryFunctionContext<['getResortPhotos', string]>) => {
  const fetchData: any = async (page: any, accumulatedData = []) => {
    const response = await simpleAxios
      .get(`${endPoints.resort.detail.media.self(resortId)}?page=${page}`, {
        signal,
      })
      .then((res) => (res.data.data ? {...res.data.data, page} : undefined))

    if (response) {
      const hasNext = response.has_next
      const updatedData = [...accumulatedData, response]

      if (hasNext) {
        return fetchData(page + 1, updatedData)
      } else {
        return updatedData
      }
    }
    return accumulatedData // Return the accumulated data if no response is available
  }

  const result = await fetchData(pageParam)
  const mergedData = result.reduce(
    (accumulator: any, currentObj: any) => {
      return {
        count: accumulator.count + currentObj.count,
        has_next: currentObj.has_next,
        result: accumulator.result.concat(currentObj.result), // Concatenate "result" arrays
        page: currentObj.page,
      }
    },
    {
      count: 0,
      has_next: false,
      result: [],
      page: 0,
    }
  )

  return mergedData
}
