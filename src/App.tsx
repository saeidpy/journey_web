import AdapterJalali from '@date-io/date-fns-jalali'
import {LocalizationProvider} from '@mui/x-date-pickers'

import {i18n} from '@lingui/core'
import {I18nProvider} from '@lingui/react'
import {messages as en} from './locales/en/messages'
import {messages as fa} from './locales/fa/messages'

import {t} from '@lingui/macro'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {Provider} from 'jotai'
import {DevTools} from 'jotai-devtools'
import {Suspense, useEffect} from 'react'
import {AppRouter} from 'src/AppRouter'
import {Theme} from 'src/core/theme'
import {FullPageError} from 'src/shared/error'
import {ErrorBoundary} from 'src/shared/error-boundary'
import {FullScreenLoading} from 'src/shared/loading'
import {SnackbarProvider} from './core/snackbar'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      useErrorBoundary: true,
      retry: 5,
      staleTime: 1000 * 60 * 5,
      networkMode: 'offlineFirst',
    },
    mutations: {
      networkMode: 'offlineFirst',
    },
  },
})

const catalog = {en, fa}

i18n.load(catalog)
i18n.loadLocaleData('fa', {plurals: () => 'other'})
i18n.activate('fa')

function App() {
  useEffect(() => {
    //Call the Ewano API to inform it that our application is ready.
    window?.ewano?.onWebAppReady?.()
  }, [])

  return (
    <Provider>
      <DevTools isInitialOpen={false} />
      <I18nProvider i18n={i18n}>
        <ErrorBoundary fallback={<FullPageError />}>
          <Suspense fallback={<FullScreenLoading />}>
            <QueryClientProvider client={queryClient}>
              <Theme>
                <LocalizationProvider
                  localeText={{cancelButtonLabel: t`Cancel`, okButtonLabel: t`Ok`, datePickerDefaultToolbarTitle: t`Select date`}}
                  dateAdapter={AdapterJalali}
                >
                  <SnackbarProvider>
                    <AppRouter />
                  </SnackbarProvider>
                </LocalizationProvider>
              </Theme>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </Suspense>
        </ErrorBoundary>
      </I18nProvider>
    </Provider>
  )
}

export default App
