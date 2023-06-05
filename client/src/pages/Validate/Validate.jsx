import './Validate.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Validate() {
  const { t, i18n } = useTranslation();

    const token = window.location.search.split('=')[1]
    let status = axios.get(`https://api.paresport.com/api/auth/validate?token=${token}`).then((response) => {
      return response.data
    })

  return (
    <div className="validate">
        {status ? <h1>{t('validate.success')}</h1> : <h1>{t('validate.error')}</h1>}
    </div>
  )
}