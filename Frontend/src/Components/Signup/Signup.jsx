// import React, { useState } from 'react'
import '../Login/Login.scss'
const Signup = ({ handleInputChange, handleSubmit }) => {

    return (
        <form className='form' onSubmit={handleSubmit}>
            <div className="fields">
                <input type='text' className='inputField' name='name' placeholder='Name' onChange={handleInputChange} required={true} />
                <input type='text' className='inputField' name='email' placeholder='E-Mail' onChange={handleInputChange} required={true} />
                <input type='password' className='inputField' name='password' placeholder='Password' onChange={handleInputChange} required={true} />
                <button className='btn' type='submit'>SignUp</button>
            </div>
        </form>
    )
}

export default Signup