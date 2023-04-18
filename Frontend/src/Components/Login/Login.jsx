// import React, { useState } from 'react'
import './Login.scss'
const Login = ({ handleSubmit, handleInputChange }) => {
    // const [email, setEmail] = useState(null)
    // const [password, setPassword] = useState(null)
    // function handleSubmit(event) {
    //     event.preventDefault();
    //     const data = { email, password };
    //     props.onLogin(data);
    // }
    return (
        <form className='form' onSubmit={handleSubmit}>
            <div className="fields">
                <input type='text' className='inputField' name='email' placeholder='E-Mail' onChange={handleInputChange} required={true} />
                <input type='password' className='inputField' name='password' placeholder='Password' onChange={handleInputChange} required={true} />
                <button className='btn' type='submit'>Login</button>
            </div>
        </form>
    )
}

export default Login