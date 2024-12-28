import { Route, Routes } from 'react-router-dom'
import { LogedLayout } from '../shared/layouts'

export const Router = () => {
  return (
    <Routes>
      <Route path="*" element={<LogedLayout>test</LogedLayout>} />
    </Routes>
  )
}
