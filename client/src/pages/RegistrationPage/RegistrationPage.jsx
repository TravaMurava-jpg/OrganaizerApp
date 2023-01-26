import React, { useState } from 'react'
import axios from 'axios'

import './RegistrationPage.scss'
const RegistrationPage = () => {
    const [form, setForm]  = useState({
        email: '',
        password: ''
    })

    const changeHandler = (event) =>{
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            await axios.post('api/auth/registration', {...form},{
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            .then(response => {
                if(response.status===201){
                alert('Registration succesful!');
                } 
            })
        } catch (error) {
            console.log(error)
            alert('Something seems to be wrong, try to check your email/password and if you are already registered')
        }
    }


    return(
       
        
        <React.Fragment>
            <div className="container">
                <div className="auth-page" onSubmit={e => e.preventDefault()}>
                    <h3>Registration</h3>
                    <form className="form form-login">
                        <div className="row">
                            <div className="input-field col s12">
                            <input type="email"
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
                        <div className='text'>Your password needs to be at least 6 characters long</div>
                        <div className="row">
                            <button className='wawes-effect waves-light btn blue'
                                    onClick={registerHandler}
                                    >
                                Registration
                            </button>

                            <a href="/" className="btn-outline btn-reg">Already registered?</a>
                        </div>
                    </form>
                    
                </div>
            </div>
        </React.Fragment>
       
       
        
    )
}

export default RegistrationPage