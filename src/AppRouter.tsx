import {Suspense} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {FullScreenLoading} from 'src/shared/loading'
import {AuthContainer} from './containers/auth'
import {MainContainer} from './containers/main'
import {AuthGuard} from './core/auth'

export function AppRouter() {
  return (
    <BrowserRouter>
      <AuthGuard>
        <Suspense fallback={<FullScreenLoading />}>
          <Routes>
            <Route path="login/*" element={<AuthContainer />} />
            <Route path="/*" element={<MainContainer />} />
          </Routes>
        </Suspense>
      </AuthGuard>
    </BrowserRouter>
  )
}
