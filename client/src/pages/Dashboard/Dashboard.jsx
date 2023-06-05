import './Dashboard.scss'
import React, { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { useJwt } from 'react-jwt'
import Cookies from 'js-cookie'

// Components
import Navbar from '../../components/Navbar/Navbar'
import Card from '../../components/Card/Card'
import MaterialReactTable from 'material-react-table';

export default function Dashboard() {
    const { t } = useTranslation()
    const { i18n } = useTranslation()
    const urlLang = window.location.pathname.split('/')[1]
    if (urlLang !== i18n.language) {
        i18n.changeLanguage(urlLang)
    }
  const [ user, setUser] = useState(null)
  const [ nextCoinsRemains, setNextCoinsRemains] = useState(null)
  const token = Cookies.get('userToken')
  const email = useJwt(token)

  useEffect(() => {
      async function getUser() {
          const user = await axios.post('https://api.paresport.com/api/auth/getCredentials', {token: token}, {
              withCredentials: true,
          }).then((res) => {
              return res.data
          })
          console.log('user :', await user)
          setUser(await user.user)
      }
      getUser()
  }, [])
  useEffect(() => {
      const intervalId = setInterval(() => {
          const nextCoins = new Date();
          const lastCoins = new Date(user?.lastCoinsReceived);
          nextCoins.setDate(lastCoins.getDate() + 1);

          const remainingTime = nextCoins.getTime() - Date.now();
          setNextCoinsRemains(remainingTime);
      }, 1000)

      return () => clearInterval(intervalId)
  }, [user?.lastCoinsReceived])

  const hours = Math.floor(nextCoinsRemains / (1000 * 60 * 60));
  const minutes = Math.floor((nextCoinsRemains % (1000 * 60 * 60)) / (1000 * 60));
  let remainingTime
  if(hours >= 0 && hours <= 24) {
        remainingTime = `${hours}h ${minutes}m`
  } else if (hours < 0) {
        remainingTime = '0h 0m'
  }

  const redeemCoins = async () => {
      const redeem = axios.post('https://api.paresport.com/redeemCoins', {token: token}, {
            withCredentials: true,
      }).then((res) => {
            return res.data
      })
      console.log('redeem :', await redeem)
  }

  const getNestedValue = (obj, path) => {
      const properties = path.split('.');
      return properties.reduce((acc, property) => (acc && acc[property]) ? acc[property] : undefined, obj);
  };

  const columns = useMemo(
      () => [
          {
                accessorKey: 'match.name',
                header: 'Match',
          },
          {
                accessorKey: 'bet.slug',
                header: 'Bet',
          },
          {
                accessorKey: 'teams.0.slug',
                header: 'Team 1'
          },
          {
                accessorKey: 'teams.1.slug',
                header: 'Team 2',
          },
          {
                accessorKey: 'amount',
                header: 'Amount',
          },
          {
                accessorKey: 'result',
                header: 'Result',
          }
      ]
  )

  return (
    <>
      <Navbar />
      <div className='dashboard-container'>
          <div className='left-container'>
              <Card className={"user-card"} title={'User'} icon={'icon-user'}>
                <div className='card-text'>
                    <p><span>{t('Username')}</span>: {user?.username}</p>
                    <p><span>{t('Email')}</span>: {user?.email}</p>
                    <p><span>{t('Name')}</span>: {user?.firstname} {user?.lastname}</p>
                </div>
              </Card>
              <Card className={"coins-card"} title={'Coins'} icon={'icon-coin'}>
                  <div className='card-text'>
                      <p><span>{t('Wallet')}</span>: {user?.coins}</p>
                      <p><span>{t('Next redeem')}</span>: {remainingTime}</p>
                  </div>
                  <button className='card-button' onClick={redeemCoins}>{t('Redeem')}</button>
              </Card>
          </div>
          <div className='right-container'>
              <Card className={"bets-card"} title={'Bets'} icon={'icon-clipboard'}>
                <div className='card-list'>
                    {user?.bets.length > 0 ? (
                        // user?.bets.map((bet, index) => {
                        //     return (
                        //         <div className='card-item' key={index}>
                        //             <p>{bet.id}</p>
                        //         </div>
                        //     )
                        // })
                        <MaterialReactTable className={"bet-table"} data={user?.bets} columns={columns} />
                    ) : (
                        <div className='empty-list'>
                            <p>{t('No bets')}</p>
                        </div>
                    )}
                </div>
              </Card>
          </div>
      </div>
    </>
  )
}