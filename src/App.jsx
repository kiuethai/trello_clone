import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

import Broad from '~/pages/Boards/_id'
import NotFound from './pages/404/NotFound'
import Auth from '~/pages/Auth/Auth'
import AccountVerification from '~/pages/Auth/AccountVerification'

import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import Settings from './pages/Settings/Settings'

/**
 * Giải pháp Clean Code trong việc xác định các route nào cần đăng nhập tài khoản xong thì mới cho truy cập
 * Sử dụng <Outlet /> của react-router-dom để hiển thị các Child Route
 */
const ProtectedRoute = ({ user }) => {
  if (!user) return <Navigate to='/login' replace={true} />
  return <Outlet />
}


function App() {
  const currentUser = useSelector(selectCurrentUser)

  return (
    <Routes>
      {/* Redirect Route*/}
      <Route path='/' element={
        < Navigate to="/boards/67bc367cd6b0ce5558773a41" replace={true} />
      } />

      {/* ProtectedRoute Routes */}
      < Route element={<ProtectedRoute user={currentUser} />}>
        {/* <Outlet /> của react-router-dom sẽ chạy vào các child route trong này */}


        {/* Broad Details */}
        <Route path='/boards/:boardId' element={<Broad />} />

        {/* User setting */}
        <Route path='/settings/account' element={<Settings/>} />
        <Route path='/settings/security' element={<Settings/>} />

      </Route>
      {/* Authentication */}
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />
      <Route path='/account/verification' element={<AccountVerification />} />
      {/*  404 Not  found page   */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
