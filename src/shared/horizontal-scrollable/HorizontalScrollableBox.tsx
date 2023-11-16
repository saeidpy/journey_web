import {Stack} from '@mui/material'
import {HeaderAndShowAll, HeaderAndShowAllProp} from './HeaderAndShowAll'
import {HorizontalScrollableWrapper, HorizontalScrollableWrapperProps} from './HorizontalScrollableWrapper'

export type HorizontalScrollableBoxProp<P extends {}, T extends Array<P>> = HeaderAndShowAllProp & HorizontalScrollableWrapperProps<P, T>

export function HorizontalScrollableBox<P extends {}, T extends Array<P>>({
  title,
  showAll,
  Component,
  items,
}: HorizontalScrollableBoxProp<P, T>) {
  return (
    <Stack direction="column" width="100%">
      <HeaderAndShowAll title={title} showAll={showAll} />
      <HorizontalScrollableWrapper Component={Component} items={items} />
    </Stack>
  )
}
