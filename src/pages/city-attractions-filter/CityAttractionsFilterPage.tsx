import {Stack} from '@mui/material'
import {Cart} from 'src/shared/cart'
import {HorizontalScrollableWrapper} from 'src/shared/horizontal-scrollable'
import {Header} from 'src/shared/layouts/app-layout'

export default function CityAttractionsFilterPage() {
  return (
    <>
      <Header hasBackButton onShare={() => {}} title="جاذبه‌ها در تهران" fullWidth />
      <Stack py={1}>
        <HorizontalScrollableWrapper Component={Cart} items={[]} />
      </Stack>
      <Stack py={1}>
        <HorizontalScrollableWrapper Component={Cart} items={[]} />
      </Stack>
      <Stack py={1}>
        <HorizontalScrollableWrapper Component={Cart} items={[]} />
      </Stack>
    </>
  )
}
