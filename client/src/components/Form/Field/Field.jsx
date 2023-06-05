import './Field.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Field(props) {
  const { t, i18n } = useTranslation();
  return (
    <div className={`form-field${props.className ? ' ' + props.className : ''}`} onClick={click}>
        <label className='form-label' data-label-text={t(props.labelText)}>
            {props.labelText ? (
                <span className='form-label__text'>{t(props.labelText)}</span>
            ) : null}
            <input className='form-input' type={props.inputType} name={props.inputName} placeholder={t(props.inputPlaceholder)} value={props.value} onChange={props.onChange} checked={props.checked}/>
        </label>
    </div>
  )
}

const click = async (e) => {
    let el = e.currentTarget
    let input = el.querySelector('input')
    switch (input.type) {
        case 'radio':
            let parent = el.parentElement
            let parentNeighbors = Array.from(parent.children).filter((child) => {
                return child.classList.contains('form-field', 'radio') && child !== el
            }).map((parentNeighbor) => {
                parentNeighbor.classList.remove('radio-checked')
            })
            el.classList.add('radio-checked')
            break;
        default:
            break;
    }
}