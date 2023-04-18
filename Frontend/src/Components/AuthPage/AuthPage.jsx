import React, { useEffect, useState } from 'react'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import api from '../api'
import { Navigate } from 'react-router-dom';
// import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { loginFunc, signupFunc } from '../../store/auth-actions';
import './AuthPage.scss'
const AuthPage = (props) => {
    const dispatch = useDispatch()
    const loggedIn = useSelector((state) => state.auth.loggedIn)
    const loading = useSelector((state) => state.auth.loading)
    const error = useSelector((state) => state.auth.error)
    const navigate = useNavigate()
    const [log, setLog] = useState('Login')
    const [userData, setUserData] = useState(null)
    const [isLog, setIsLog] = useState(false)
    const handleInputChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }
    // const handleLogin = async (e) => {
    //     e.preventDefault()
    //     try {
    //         const response = await api.post('/auth/login', userData);
    //         console.log(response.data);
    //         if (response.status === 200) {
    //             setIsLog(true)
    //             props.onLogin(isLog)
    //             console.log(response.data.token)
    //             localStorage.setItem('token', response.data.token);
    //             // Redirect the user to the dashboard or home page
    //             navigate('/main')
    //         }
    //         console.log(isLog)
    //         // if (isLog) {
    //         //     <Navigate to='/main' replace />
    //         // }
    //     } catch (error) {
    //         if (error.response.status === 400) {
    //             // handle incorrect username or password error
    //             console.log(error.response.data.message);
    //         } else {
    //             // handle other errors
    //             console.error(error);
    //         }
    //     }
    // }
    const handleLogin = async (e) => {
        e.preventDefault()
        dispatch(loginFunc(userData))
    }

    const handleSignup = async (e) => {
        e.preventDefault()
        dispatch(signupFunc(userData))
    }

    return (
        <div className="main">
            <div className="nav">
                <img src='/assets/logo.svg' alt='logo' />
            </div>
            <div className="page">

                <div className='left'>
                    {/* <img src='/assets/signin/pets_wall.svg' alt='wall' /> */}
                </div>
                <div className="right">
                    <div className="btns-container">
                        <div className="btns">
                            <button onClick={(e) => setLog('Login')} className={log === 'Login' ? 'btnActive' : 'btnNotActive'}>Login</button>
                            <button onClick={(e) => setLog('Signup')} className={log === 'Signup' ? 'btnActive' : 'btnNotActive'}>SignUp</button>
                        </div>
                    </div>
                    {log === 'Login' ?
                        <Login className='login' handleInputChange={handleInputChange} handleSubmit={handleLogin} />
                        :
                        <Signup handleInputChange={handleInputChange} handleSubmit={handleSignup} />
                    }
                    {/* {JSON.stringify(isLog)} */}
                </div>
            </div>
        </div>
    )
}

export default AuthPage