import './ErrorMessage.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function ErrorMessage({ title, message }) {
  const { t, i18n } = useTranslation();
  return (
    <div className='error-box'>
        { title ? <h1>{t(title)}</h1> : null }
        { message ? <p>{t(message)}</p> : null }
    </div>
  )
}