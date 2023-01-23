import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import AuthPage from './pages/AuthPage/AuthPage'
import MainPage from './pages/MainPage/MainPage'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'

export const useRoutes = (isLogin) => {
    if (!isLogin) {
        return(
            <Routes>
                    <Route path='/' element ={<Navigate to="/login" replace />} />
                    <Route path='/login' element={ <AuthPage />}  />
                    <Route path='/registration' element={<RegistrationPage/>} />
            </Routes>
        )
       
    }

    return(
        <Routes>
            <Route path='/login' element={<Navigate to="/dashboard" replace />} />
            <Route path='/dashboard' element={<MainPage/>} />
        </Routes>
    )
}