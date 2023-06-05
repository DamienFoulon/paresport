import './Navbar.scss'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Cookies from 'js-cookie'
import axios from 'axios'

// Utils
import isLogin from '../../utils/isLogin'

export default function Navbar() {
    const { t } = useTranslation()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    async function checkLogin(token, mail) {
        token && mail ? setIsLoggedIn(await isLogin(token, mail)) : setIsLoggedIn(false)
    }

    useEffect(() => {
        const token = Cookies.get('userToken')
        const mail = Cookies.get('userEmail')
        checkLogin(token, mail)
    }, [])

    const logout = async () => {
        await axios.post('https://api.paresport.com/api/auth/logout', {
            token: Cookies.get('userToken')
        }).then((res) => {
            console.log(res)
            Cookies.remove('userToken')
            Cookies.remove('userEmail')
            setIsLoggedIn(false)
            const token = Cookies.get('userToken')
            const mail = Cookies.get('userEmail')
            checkLogin(token, mail)
            window.location.reload(false);
        })
    }

    return (
        <header>
            <div className="preventHeadband">
                <h1>
                    {t(
                        'Warning: This site is purely fictitious, no money transaction is possible.'
                    )}
                </h1>
                <p>
                    {t(
                        'Please understand, however, that playing on any other platform may be addictive.'
                    )}
                    <br />
                    {t(
                        'If you think you have a problem, please consult the player info service site: '
                    )}
                    &nbsp;
                    <a
                        href="https://www.joueurs-info-service.fr/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        https://www.afjv.org/
                    </a>
                </p>
            </div>
            <div className="navbar">
                <div className="navbar-left">
                    <div className="logo">
                        <Link to="/"> Paresport </Link>
                    </div>
                    <Link to="/league_of_legends"> LoL </Link>
                    <Link to="/valorant"> Valorant </Link>
                    <Link to="/csgo"> CS:GO </Link>
                    <Link to="/all_scenes">{t('All')}...</Link>
                </div>
                <div className="navbar-right">
                    {isLoggedIn ? (
                        <>
                            <Link to="/dashboard" className={'navbar-dashboardBtn navbar-btn navbar-light-button'}>
                                {t('Dashboard')}
                            </Link>
                            <Link
                                to="/logout"
                                className={'navbar-logoutBtn navbar-btn navbar-dark-button'}
                                onClick={logout}
                            >
                                {t('Logout')}
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/register" className={'navbar-registerBtn navbar-btn navbar-light-button'}>
                                {t('Register')}
                            </Link>
                            <Link to="/login" className={'navbar-loginBtn navbar-btn navbar-dark-button'}>
                                {t('Login')}
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}