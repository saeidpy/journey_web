import {useAtom} from 'jotai'
import {errorAtom} from 'src/atoms'
export const useErrorContext = () => {
  const [errorState] = useAtom(errorAtom)
  return errorState
}

export {errorAtom as ErrorContext}
