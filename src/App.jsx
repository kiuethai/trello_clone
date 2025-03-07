import { Routes, Route, Navigate } from 'react-router-dom'

import Broad from '~/pages/Boards/_id'
import NotFound from './pages/404/NotFound'
import Auth from '~/pages/Auth/Auth'

function App() {
  return (
    <Routes>
      {/* Redirect Route*/}
      <Route path='/' element={
        < Navigate to="/boards/67bc367cd6b0ce5558773a41" replace={true} />
      } />

      {/* Broad Details */}
      <Route path='/boards/:boardId' element={<Broad />} />

      {/* Authentication */}
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />

      {/*  404 Not  found page   */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
