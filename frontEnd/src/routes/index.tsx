import { useAuthContext } from '../shared/contexts/AuthContext'
import { EntryPage, Home, Login, Register } from '../pages'
import { LogedLayout, AuthLayout } from '../shared/layouts'
import { Route, Routes } from 'react-router-dom'
import { CircularProgress } from '@mui/material'

export const Router = () => {
  const { isAuthenticated, isCheckingAuth } = useAuthContext()

  return (
    <Routes>
      {isCheckingAuth ? (
        <Route
          path="*"
          element={<CircularProgress variant="indeterminate" />} // Loading page
        />
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
