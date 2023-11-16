import {
  Alert,
  AlertColor,
  AlertProps as MuiAlertProps,
  Slide,
  Snackbar,
  SnackbarOrigin,
  SnackbarProps as MuiSnackbarProps,
} from '@mui/material'
import {createContext, PropsWithChildren, SyntheticEvent, useCallback, useContext, useMemo, useState} from 'react'

interface SnackbarOptions {
  snackbarProps: Omit<MuiSnackbarProps, 'open' | 'onClose' | 'autoHideDuration' | 'anchorOrigin'>
  alertProps: Omit<MuiAlertProps, 'onClose' | 'severity'>
  severity: AlertColor
  autoHideDuration: number
  anchorOrigin: SnackbarOrigin
}

const DEFAULT_SNACKBAR_OPTIONS: SnackbarOptions = {
  snackbarProps: {},
  alertProps: {},
  severity: 'success',
  autoHideDuration: 4000,
  anchorOrigin: {horizontal: 'center', vertical: 'bottom'},
}

export interface SnackbarValue {
  id: number
  open: boolean
  message: string
  options: SnackbarOptions
}

export interface SnackbarContextValue {
  showSnackbar: (message: string, options?: Partial<SnackbarOptions>) => Promise<number>
  closeSnackbar: (key: number) => Promise<boolean>
}
export const SnackbarContext = createContext<SnackbarContextValue | null>(null)

export function useSnackbar(): SnackbarContextValue {
  const context = useContext(SnackbarContext)
  if (!context) {
    throw new Error('useSnackbar must be used inside the AuthGuard')
  }
  return context
}

export interface SnackbarProviderProps {}

export function SnackbarElement({
  id,
  message,
  open,
  options,
  closeSnackbar,
}: SnackbarValue & {
  closeSnackbar: (id: number) => void
}) {
  const handleClose = useCallback(
    (_?: SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return
      }
      closeSnackbar(id)
    },
    [closeSnackbar, id]
  )
  return (
    <Snackbar
      {...options.snackbarProps}
      open={open}
      TransitionComponent={Slide}
      autoHideDuration={options?.autoHideDuration}
      onClose={handleClose}
      anchorOrigin={options?.anchorOrigin}
    >
      <Alert {...(options?.alertProps ?? {})} onClose={handleClose} severity={options?.severity}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export function SnackbarProvider({children}: PropsWithChildren<SnackbarProviderProps>) {
  const [snackbars, setSnackbars] = useState<SnackbarValue[]>([])

  const closeSnackbar = useCallback((key: number) => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        setSnackbars((prev) => {
          const newSnackBars = [...prev]
          const index = prev.findIndex((item) => item.id === key)
          if (index > -1) {
            newSnackBars.splice(index, 1)
            resolve(true)
            return newSnackBars
          }
          setTimeout(() => {
            resolve(false)
          })
          return prev
        })
      }, 300)
      setSnackbars((prev) => {
        const newSnackBars = [...prev]
        const index = prev.findIndex((item) => item.id === key)
        if (index > -1) {
          newSnackBars[index].open = false
          return newSnackBars
        }
        return prev
      })
    })
  }, [])

  const handleShow = useCallback(
    (
      message: string,
      {
        alertProps = {...DEFAULT_SNACKBAR_OPTIONS.alertProps},
        anchorOrigin = {...DEFAULT_SNACKBAR_OPTIONS.anchorOrigin},
        autoHideDuration = DEFAULT_SNACKBAR_OPTIONS.autoHideDuration,
        severity = DEFAULT_SNACKBAR_OPTIONS.severity,
        snackbarProps = {...DEFAULT_SNACKBAR_OPTIONS.snackbarProps},
      }: Partial<SnackbarOptions> = {
        ...DEFAULT_SNACKBAR_OPTIONS,
        alertProps: {...DEFAULT_SNACKBAR_OPTIONS.alertProps},
        anchorOrigin: {...DEFAULT_SNACKBAR_OPTIONS.anchorOrigin},
        snackbarProps: {...DEFAULT_SNACKBAR_OPTIONS.snackbarProps},
      }
    ) => {
      return new Promise<number>((resolve) => {
        setSnackbars((prev) => {
          const id = ((prev.length && prev[prev.length - 1]?.id) ?? -1) + 1
          resolve(id)
          return [
            ...prev,
            {
              id,
              open: true,
              message,
              options: {
                alertProps,
                anchorOrigin,
                autoHideDuration,
                severity,
                snackbarProps,
              },
            },
          ]
        })
      })
    },
    []
  )

  const providerValue = useMemo(() => ({showSnackbar: handleShow, closeSnackbar}), [closeSnackbar, handleShow])

  return (
    <SnackbarContext.Provider value={providerValue}>
      {children}
      {snackbars.map(({id, open, message, options}, i) => (
        <SnackbarElement id={id} open={open} message={message} options={options} key={i} closeSnackbar={closeSnackbar} />
      ))}
    </SnackbarContext.Provider>
  )
}
