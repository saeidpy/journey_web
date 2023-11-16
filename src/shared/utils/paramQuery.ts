interface ParamQueryType {
  [key: string]: string
}

export const parseParamQuery = (search: string): ParamQueryType => {
  if (!search || !search.startsWith('?')) {
    return {}
  }
  return search
    .substring(1)
    .split('&')
    .reduce((prev, cur) => ({...prev, [cur.split('=')[0]]: cur.split('=')[1]}), {})
}

export const toParamQuery = (params: ParamQueryType) => {
  return `?${Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')}`
}

export const onlyReturnUrl = (search: string) => {
  const params = parseParamQuery(search)
  return !params.returnUrl ? '' : `?returnUrl=${params.returnUrl}`
}
