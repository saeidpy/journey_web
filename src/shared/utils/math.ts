export const toPercentage = (val: number, precision = 2) => val.toFixed(precision).replace(/\.0+$/, '') + '%'
export const numberWithCommas = (str: string | number) => str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
