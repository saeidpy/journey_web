import {mobileUI} from 'src/shared/constants'

export const isReachedBottom = (scrollEl: HTMLElement) =>
  scrollEl.scrollHeight - scrollEl.offsetHeight - scrollEl.scrollTop - mobileUI.scroll.offsetFromBottom <= 0
