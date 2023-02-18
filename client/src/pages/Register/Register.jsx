import './Register.scss'
import React from 'react'
import axios from 'axios'
import { init } from 'onfido-sdk-ui'
import { useTranslation } from 'react-i18next'

import Navbar from '../../components/Navbar/Navbar'
import { logDOM } from '@testing-library/react'

export default function Register() {
    const { i18n } = useTranslation()
    const urlLang = window.location.pathname.split('/')[1]
    if (urlLang !== i18n.language) {
        i18n.changeLanguage(urlLang)
    }

    const [onfidoToken, setOnfidoToken] = React.useState()

    React.useEffect(() => {
        axios.post('/register').then((response) => {
            setOnfidoToken(response.data.sdkToken)
            console.log(response.data)
        })
    }, [])

    async function Verify() {
        const onfido = await init({
            token: onfidoToken,
            containerId: 'onfido-mount',
            onComplete: function (data) {
                console.log('everything is complete')
                console.log(data)
            },
        })
    }

    let email = 'damie.foulon@gmail.com'
    let password = 'azesvm;fnzekjrh'
    let firstname = 'Damien'
    let lastname = 'Foulon'
    let birthdate = new Date('2002-12-23')
    let username = 'Yaguaa'

    // axios
    //     .post('/register', {
    //         email,
    //         password,
    //         firstname,
    //         lastname,
    //         birthdate,
    //         username,
    //     })
    //     .then((response) => {
    //         localStorage.setItem('token', response.data.token)
    //         return true
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //         return false
    //     })

    return (
        <>
            <Navbar />
            <button onClick={() => Verify()}>Verify</button>
            <div id="onfido-mount"></div>
        </>
    )
}
