import './Row.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Row(props) {
  const { t, i18n } = useTranslation();
  return (
      <div className={`form-row${props.className ? ' ' + props.className : ''}`}>
          <div className='form-row__label'>
                <span className='form-row__label-text'>{t(props.labelText)}</span>
          </div>
          {props.children}
      </div>
  )
}