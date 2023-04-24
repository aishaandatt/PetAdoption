import React from 'react'
// import axios from 'axios'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { useDispatch, useSelector } from "react-redux";
// import api from '../api'
import { logoutFunc, tokenFunc } from '../../store/auth-actions';
import { fetchUserName } from '../../store/user-actions';
import { fetchProduct } from '../../store/admin-actions';
import './LandingPage.scss'
// import { getUsers } from '../../store/admin-actions';
const LandingPage = (props) => {
    const dispatch = useDispatch()
    const [flag, setFlag] = useState(1);
    const data = useSelector((state) => state.auth.data)
    const loggedIn = useSelector((state) => state.auth.loggedIn)
    // const loading = useSelector((state) => state.auth.loading)
    // const error_redux = useSelector((state) => state.auth.error)
    // const isAdm = useSelector((state) => state.auth.isAdmin)
    const token = useSelector((state) => state.auth.token)
    const [error, setError] = useState('');
    const products = useSelector((state) => state.product.products)
    const navigate = useNavigate()

    const handleLogout = async () => {
        dispatch(logoutFunc())
        navigate('/')
        setFlag(true)
    }
    // useEffect(() => {
    //     dispatch(tokenFunc())
    // })
    useEffect(() => {
        dispatch(fetchProduct())
    }, [dispatch])
    // useEffect(() => {
    //     if (token && flag) {
    //         dispatch(fetchUserName())
    //         setFlag(0)
    //     }
    // }, [data])

    //ADMIN GET ALL


    return (
        <div>
            <Navbar onFireLogout={handleLogout} />
            {data ? (
                <div>
                    {/* <div>Welcome {data.name}</div> */}
                    {/* <button onClick={handleLogout}>Logout</button> */}
                    <div className="pets">

                        {products.map((product) => (
                            <div className="pet" key={product._id}>
                                <img src={`http://localhost:4000/uploads/${product.image}`} alt='' />
                                <div className="info">
                                    <div className="text">
                                        <p className='name'>{product.name}</p>
                                        <p className='breed'>{product.breed}</p>
                                    </div>
                                    <div className="btn">
                                        <button>Fav</button>
                                    </div>
                                </div>
                            </div>
                            // <tr key={product._id}>
                            //     <td><img src={`http://localhost:4000/uploads/${product.image}`} style={{ width: '30%' }} /></td>
                            //     <td>{product.name}</td>
                            //     <td>{product.breed}</td>
                            //     <td>{product.description}</td>
                            //     <td>{product.age}</td>
                            // <td>{product.category}</td>
                            // </tr>
                        ))}
                    </div>
                </div>

            ) : (
                <div>{error || 'Please login to continue'}</div>
            )}
        </div>

    )
}

export default LandingPage