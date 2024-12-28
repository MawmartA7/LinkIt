import { Route, Routes } from 'react-router-dom'
import { LogedLayout } from '../shared/layouts/LogedLayout'

export const Router = () => {
  return (
    <Routes>
      <Route path="*" element={<LogedLayout>test</LogedLayout>} />
    </Routes>
  )
}
