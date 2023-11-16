export const handleRowHeight = () => {
  let height = 420
  const wh = window.innerWidth
  if (wh <= 300) {
    height = 280
  } else if (wh < 330) {
    height = 300
  } else if (wh < 360) {
    height = 320
  } else if (wh < 390) {
    height = 340
  } else if (wh < 420) {
    height = 360
  } else if (wh < 450) {
    height = 380
  }
  return height
}
