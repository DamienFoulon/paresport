import './Card.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Card(props) {
  const { t, i18n } = useTranslation();
  return (
    <div className={`card${props.className ? ' ' + props.className : ''}`}>
        <div className='card-title'>
            <i className={props.icon}></i>
            {t(props.title)}
        </div>
        <div className='card-content'>
            {props.children}
        </div>
    </div>
  )
}