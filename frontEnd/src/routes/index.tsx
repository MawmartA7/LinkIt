import { useAuthContext } from '../shared/contexts/AuthContext'
import { LoadingPage } from '../pages/loadingPage/LoadingPage'
import { Route, Routes, useLocation } from 'react-router-dom'
import { LogedLayout, AuthLayout } from '../shared/layouts'
import { UseRecaptcha } from '../shared/hooks/UseRecaptcha'
import { RedirectToHome } from './RedirectToHome'
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

  const location = useLocation()

  const recaptchaEnabled =
    location.pathname === '/register' ||
    location.pathname === '/login' ||
    location.pathname === '/contact'

  UseRecaptcha(recaptchaEnabled)

  if (firstLoad)
    return (
      <Routes>
        <Route path="*" element={<LoadingPage />} />
      </Routes>
    )

  return (
    <Routes>
      {isAuthenticated ? (
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
          <Route path="*" element={<RedirectToHome />} />
        </>
      ) : (
        <>
          <Route path="/" element={<EntryPage />} />
          <Route path="*" element={<RedirectToHome />} />
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
      <Route path="/link-unavailable" element={<LinkUnavailable />} />
      <Route path="/link-not-found" element={<LinkNotFound />} />
    </Routes>
  )
}
