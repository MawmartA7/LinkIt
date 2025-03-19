import { useAuthContext } from '../shared/contexts/AuthContext'
import { LoadingPage } from '../pages/loadingPage/LoadingPage'
import { LogedLayout, AuthLayout } from '../shared/layouts'
import { Navigate, Route, Routes } from 'react-router-dom'
import {
  PasswordRecovery,
  LinkUnavailable,
  SendEmailPage,
  LinkNotFound,
  LinkDetails,
  EntryPage,
  Register,
  Contact,
  Links,
  Login,
  Home
} from '../pages'

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
          <Route
            path="/link-details/:alias"
            element={
              <LogedLayout>
                <LinkDetails />
              </LogedLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <LogedLayout>
                <Contact />
              </LogedLayout>
            }
          />
        </>
      ) : (
        <>
          <Route path="/" element={<EntryPage />} />
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
          <Route
            path="/password-recovery/send-Email"
            element={
              <AuthLayout>
                <SendEmailPage />
              </AuthLayout>
            }
          />
          <Route
            path="/password-recovery"
            element={
              <AuthLayout>
                <PasswordRecovery />
              </AuthLayout>
            }
          />
        </>
      )}
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/link-unavailable" element={<LinkUnavailable />} />
      <Route path="/link-not-found" element={<LinkNotFound />} />
    </Routes>
  )
}
