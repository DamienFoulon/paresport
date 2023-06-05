import './Register.scss'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

// Components
import Navbar from '../../components/Navbar/Navbar'
import Form from '../../components/Form/Form'
import Row from '../../components/Form/Row/Row'
import Field from '../../components/Form/Field/Field'

export default function Register() {
    const { t } = useTranslation()
    const { i18n } = useTranslation()
    const urlLang = window.location.pathname.split('/')[1]
    if (urlLang !== i18n.language) {
        i18n.changeLanguage(urlLang)
    }
    const [formValue, setFormValue] = useState({
        gender: 'Man',
        name: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        switch (name) {
            case 'birthdate':
                let date = new Date(value)
                console.log(date);
                setFormValue(prevState => ({ ...prevState, [name]: date }))
                break;
            default:
                setFormValue(prevState => ({ ...prevState, [name]: value }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post('https://api.paresport.com/api/auth/register', formValue).then(async (res) => {
            console.log(await res);
        })
    }

    return (
        <>
            <Navbar />
            <div className='main-container'>
                <div className='form-container'>
                    <h1 className='form-title'>
                        {t('Register')}
                    </h1>
                    <Form onSubmit={handleSubmit}>
                        <Row className="radio-row" labelText={'Gender'}>
                            <Field
                                className={'radio radio-checked'}
                                labelText={'Man'}
                                inputName={'gender'}
                                inputType={'radio'}
                                value={'Man'}
                                onChange={handleInputChange}
                                checked={formValue.gender === 'Man'}
                            />
                            <Field
                                className={'radio'}
                                labelText={'Woman'}
                                inputName={'gender'}
                                inputType={'radio'}
                                value={'Woman'}
                                onChange={handleInputChange}
                                checked={formValue.gender === 'Woman'}
                            />
                        </Row>
                        <Row>
                            <Field
                                inputName={'username'}
                                inputType={'text'}
                                inputPlaceholder={'Username'}
                                onChange={handleInputChange}
                            />
                        </Row>
                        <Row>
                            <Field
                                inputName={'firstname'}
                                inputType={'text'}
                                inputPlaceholder={'Name'}
                                onChange={handleInputChange}
                            />
                            <Field
                                inputName={'lastname'}
                                inputType={'text'}
                                inputPlaceholder={'Lastname'}
                                onChange={handleInputChange}
                            />
                        </Row>
                        <Row>
                            <Field
                                inputName={'birthdate'}
                                inputType={'date'}
                                onChange={handleInputChange}
                            />
                        </Row>
                        <Row>
                            <Field
                                inputName={'email'}
                                inputType={'email'}
                                inputPlaceholder={'Email'}
                                onChange={handleInputChange}
                            />
                        </Row>
                        <Row>
                            <Field
                                inputName={'password'}
                                inputType={'password'}
                                inputPlaceholder={'Password'}
                                onChange={handleInputChange}
                            />
                        </Row>
                        <Row>
                            <Field
                                inputName={'confirmPassword'}
                                inputType={'password'}
                                inputPlaceholder={'Confirm Password'}
                                onChange={handleInputChange}
                            />
                        </Row>
                        <Row>
                            <button className='button-submit' type='submit'>{t('Submit')}</button>
                        </Row>
                    </Form>
                </div>
            </div>
        </>
    )
}