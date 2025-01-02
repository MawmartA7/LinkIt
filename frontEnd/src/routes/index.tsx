import { Route, Routes } from 'react-router-dom'
import { LogedLayout } from '../shared/layouts'
import { Home } from '../pages'

export const Router = () => {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <LogedLayout>
            <Home />
          </LogedLayout>
        }
      />
    </Routes>
  )
}
