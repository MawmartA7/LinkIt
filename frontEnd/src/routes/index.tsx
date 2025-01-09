import { Route, Routes } from 'react-router-dom'
import { LogedLayout } from '../shared/layouts'
import { EntryPage, Home } from '../pages'
import { useAuthContext } from '../shared/contexts/AuthContext'
import { CircularProgress } from '@mui/material'

export const Router = () => {
  const { isAuthenticated, isCheckingAuth } = useAuthContext()

  return (
    <Routes>
      {isCheckingAuth && (
        <Route
          path="*"
          element={<CircularProgress variant="indeterminate" />} // Loading page
        />
      )}
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
        </>
      ) : (
        <>
          <Route path="*" element={<EntryPage />} />
        </>
      )}
    </Routes>
  )
}
