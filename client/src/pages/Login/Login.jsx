import './Login.scss'
import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { atom, useSetRecoilState, useRecoilValue } from 'recoil';
import { isAuthenticatedAtom, userAtom } from '../../atoms/atoms';
import Cookies from 'js-cookie'
import { useTranslation } from 'react-i18next'

// Components
import Navbar from '../../components/Navbar/Navbar'
import Form from '../../components/Form/Form'
import Row from '../../components/Form/Row/Row'
import Field from '../../components/Form/Field/Field'
import { Link } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'

export default function Login() {
    const { t } = useTranslation()
    const { i18n } = useTranslation()
    const urlLang = window.location.pathname.split('/')[1]
    if (urlLang !== i18n.language) {
        i18n.changeLanguage(urlLang)
    }
    const [formValue, setFormValue] = useState({})
    const [errorBox, setErrorBox] = useState(null)
    const setIsAuthenticated = useSetRecoilState(isAuthenticatedAtom)
    const setUser = useSetRecoilState(userAtom)
    const user = useRecoilValue(userAtom)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        switch (name) {
            case 'birthdate':
                let date = new Date(value)
                setFormValue(prevState => ({ ...prevState, [name]: date }))
                break;
            default:
                setFormValue(prevState => ({ ...prevState, [name]: value }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post('https://api.paresport.com/api/auth/login', formValue, {
            withCredentials: true,
        }).then(async (res, err) => {
            if(!err && res.status === 200 && !res.data.message) {
                console.log(res)
                setIsAuthenticated(true)
                setUser({
                    token: await res.data.token,
                    email: await res.data.email
                })
                Cookies.set('userToken', res.data.token)
                Cookies.set('userEmail', res.data.email)
                window.location = 'https://paresport.com/dashboard'
            } else if(res.data.message) {
                console.log(res.data.message)
                switch (res.data.message) {
                    case 'User not verified':
                        console.log(1)
                        setErrorBox({
                            title: 'Account not verified',
                            message: 'Please check your emails and click on the link to verify your account'
                        })
                        break;
                    case 'User not found':
                        console.log(2)
                        setErrorBox({
                            title: 'Account not found',
                            message: 'No account found with this email'
                        })
                        break;
                    case 'Incorrect password':
                        console.log('3')
                        setErrorBox({
                            title: 'Incorrect password',
                            message: 'Please check your email and password'
                        })
                        break;
                    default:
                        console.log('4')
                        setErrorBox({
                            title: 'Error',
                            message: 'An error occured, please try again later'
                        })
                }
                console.log(errorBox)
            }
        })
    }

    return (
        <>
            <Navbar />
            <div className='main-container'>
                {errorBox && <ErrorMessage title={errorBox.title} message={errorBox.message} />}
                <div className='form-container'>
                    <h1 className='form-title'>
                        {t('Login')}
                    </h1>
                    <Form onSubmit={handleSubmit}>
                        <Field
                            inputName={'email'}
                            inputType={'email'}
                            inputPlaceholder={'Email'}
                            onChange={handleInputChange}
                        />
                        <Field
                            inputName={'password'}
                            inputType={'password'}
                            inputPlaceholder={'Password'}
                            onChange={handleInputChange}
                        />
                        <button className='button-submit' type='submit'>{t('Submit')}</button>
                    </Form>
                    <p className='no-account'>
                        {t('No account yet?')}
                        <br />
                        {t('Create one for free ')}
                        <Link to='/register'>{t('here')}</Link>
                        &nbsp;!
                    </p>
                </div>
            </div>
        </>
    )
}