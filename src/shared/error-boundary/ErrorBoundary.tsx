import {useAtom} from 'jotai'
import React, {ErrorInfo, ReactNode, useEffect} from 'react'
import {errorAtom} from 'src/atoms'

interface Props {
  fallback?: ReactNode
  children: ReactNode
}

export const ErrorBoundary: React.FC<Props> = ({fallback, children}) => {
  const [errorState, setErrorState] = useAtom(errorAtom)

  const retry = () => {
    setErrorState({error: null, reset: () => {}})
  }

  useEffect(() => {
    const componentDidCatch = (error: Error, errorInfo: ErrorInfo) => {
      setErrorState({error, reset: retry})
    }

    const resetError = () => {
      setErrorState({error: null, reset: () => {}})
    }

    // Add a listener to reset the error state when the component unmounts
    return resetError
  }, [setErrorState])

  if (errorState.error) {
    return <>{fallback || null}</> // Wrap the fallback in JSX brackets to ensure it's a valid JSX element
  }

  return <>{children}</> // Wrap the children in JSX brackets to ensure it's a valid JSX element
}

export default ErrorBoundary
