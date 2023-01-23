import React, { useState, useContext } from 'react'

import axios from 'axios'

import './AuthPage.scss'
import { AuthContext } from '../../context/AuthContext'

const AuthPage = () => {
    const [form, setForm]  = useState({
        email: '',
        password: ''
    })

    const { login } = useContext(AuthContext)

    const changeHandler = (event) =>{
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async () => {
        try {
            await axios.post('api/auth/login', {...form}, {
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            .then(response => {
                login(response.data.token, response.data.userId)
            })
        } catch (error) {
            console.log(error)
        }
    }


    return(
       
        
        <React.Fragment>
            <div className="container">
                <div className="auth-page" onSubmit={e => e.preventDefault()}>
                   
                    <h3>Welcome!</h3>
                    <form className="form form-login">
                        <div className="row">
                            <div className="input-field col s12">
                            <input type="text"
                                   name="email"
                                   className="validate"
                                   onChange={changeHandler}
                            />
                            <label htmlFor="email">Email</label>
                            </div>
                        
                        <div className="input-field col s12">
                            <input type="password"
                                   name="password"
                                   className="validate"
                                   onChange={changeHandler}
                            />
                            <label htmlFor="password">Password</label>
                            </div>
                        </div>
                        <div className="row">
                            <button className='wawes-effect waves-light btn blue'
                                    onClick={loginHandler}
                            >
                                Login
                            </button>

                            <a href="/registration" className="btn-outline btn-reg">Registration</a>
                        </div>
                    </form>
                    
                </div>
            </div>
        </React.Fragment>
       
       
        
    )
}

export default AuthPage