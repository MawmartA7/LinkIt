import {
  EntryPage,
  Home,
  Login,
  Register,
  Links,
  LinkUnavailable
} from '../pages'
import { useAuthContext } from '../shared/contexts/AuthContext'
import { LoadingPage } from '../pages/loadingPage/LoadingPage'
import { LogedLayout, AuthLayout } from '../shared/layouts'
import { Route, Routes } from 'react-router-dom'

export const Router = () => {
  const { isAuthenticated, firstLoad } = useAuthContext()

  return (
    <Routes>
      {firstLoad ? (
        <Route path="*" element={<LoadingPage />} />
      ) : isAuthenticated ? (
        <>
          <Route
            path="/"
            element={
              <LogedLayout>
                <Home />
              </LogedLayout>
            }
          />
          <Route
            path="/links"
            element={
              <LogedLayout>
                <Links />
              </LogedLayout>
            }
          />
        </>
      ) : (
        <>
          <Route path="*" element={<EntryPage />} />
          <Route
            path="/login"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path="/register"
            element={
              <AuthLayout>
                <Register />
              </AuthLayout>
            }
          />
        </>
      )}
      <Route path="/link-unavailable" element={<LinkUnavailable />} />
    </Routes>
  )
}
