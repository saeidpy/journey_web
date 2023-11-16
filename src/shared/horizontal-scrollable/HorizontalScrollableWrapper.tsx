import {Stack, styled} from '@mui/material'
import {FunctionComponent} from 'react'

const Wrapper = styled('div')({
  width: '50%',
  boxSizing: 'border-box',
  flexShrink: 0,
})

export type HorizontalScrollableWrapperProps<P extends {}, T extends Array<P>> = {
  items: T
  Component: FunctionComponent<P>
}

const ScrollableWrapper = styled(Stack)({
  overflowX: 'auto',
})

export function HorizontalScrollableWrapper<P extends {}, T extends Array<P>>({items, Component}: HorizontalScrollableWrapperProps<P, T>) {
  return (
    <ScrollableWrapper direction="row">
      {items.map((item, index) => (
        <Wrapper key={index}>
          <Component {...item} />
        </Wrapper>
      ))}
    </ScrollableWrapper>
  )
}
