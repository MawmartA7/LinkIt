import { useAuthContext } from '../shared/contexts/AuthContext'
import { EntryPage, Home, Login, Register } from '../pages'
import { LogedLayout, AuthLayout } from '../shared/layouts'
import { Route, Routes } from 'react-router-dom'
import { LoadingPage } from '../pages/loadingPage/LoadingPage'

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
    </Routes>
  )
}
