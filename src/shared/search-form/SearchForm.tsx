import {InputBaseProps} from '@mui/material'
import {ChangeEvent, FormEvent, useEffect, useRef, useState} from 'react'
import {SearchInput} from 'src/shared/input'

type SearchFromProp = Omit<InputBaseProps, 'onChange' | 'name' | 'onSubmit'> & {
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
  onBack?: () => void
  onClear?: (() => void) | boolean
  name: string
}

export const SearchForm = ({onChange, onSubmit, onClear, name, ...rest}: SearchFromProp) => {
  const [hasBack, setHasBack] = useState(true)
  const timeout = useRef<number>()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value && hasBack) {
      setHasBack(false)
    }
    if (!value && !hasBack) {
      setHasBack(true)
      if (onChange) {
        onChange('')
      }
    }
    if (timeout) {
      window.clearTimeout(timeout.current)
      timeout.current = undefined
    }
    if (value && onChange) {
      timeout.current = window.setTimeout(() => {
        if (onChange) {
          onChange(value)
        }
      }, 500)
    }
  }
  useEffect(
    () => () => {
      if (timeout.current) {
        window.clearTimeout(timeout.current)
      }
    },
    []
  )
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const value = new FormData(e.currentTarget).get(name)?.toString() ?? ''
    if (onSubmit) {
      onSubmit(value)
    }
  }
  const handleOnClear = () => {
    if (typeof onClear === 'function') {
      onClear()
    } else if (onClear && onChange) {
      onChange('')
    }
    setHasBack(true)
  }
  return (
    <form style={{width: '100%'}} onSubmit={handleSubmit}>
      <SearchInput onChange={handleChange} onClear={handleOnClear} hasBack={hasBack} name={name} fullWidth {...rest} />
    </form>
  )
}
