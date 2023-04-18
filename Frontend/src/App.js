import './App.css';
import AuthPage from './Components/AuthPage/AuthPage';
import LandingPage from './Components/LandingPage/LandingPage';
import AdminPage from './Components/AdminPage/AdminPage'
import { BroserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { isAdminFunc, tokenFunc } from './store/auth-actions';
import ProfileScreen from './Components/ProfileScreen/ProfileScreen';
import Notification from './Notification';
function App() {
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const loggedIn = useSelector((state) => state.auth.loggedIn)
  const notification = useSelector((state) => state.ui.notification)
  const isAdm = useSelector((state) => state.auth.isAdmin)
  const loading = useSelector((state) => state.auth.loading)
  const error_redux = useSelector((state) => state.auth.error)
  const token = useSelector((state) => state.auth.token)

  // useEffect(() => {
  //   console.log('login', loggedIn)
  //   console.log('loading', loading)
  //   console.log('error', error_redux)
  //   console.log('token', token)
  //   console.log('admin', isAdm)
  // }, [loggedIn, loading, error_redux, token, isAdm])
  // useEffect(() => {
  //   if (loggedIn || token) {
  //     navigate('/main', { replace: true });
  //   }
  //   if (!loggedIn || !token) {
  //     navigate('/', { replace: true })
  //   }

  // }, [loggedIn, token]);
  useEffect(() => {
    dispatch(tokenFunc())
    dispatch(isAdminFunc())
  })
  return (
    <>
      {notification && <Notification type={notification.type} message={notification.message} />}
      <Routes>
        <Route path="/" element={token ? <LandingPage /> : <AuthPage />} />
        {/* <Route path="/main" element={<LandingPage />} /> */}
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/profile' element={<ProfileScreen />} />
      </Routes>
    </>
  );
}

export default App;