import './Form.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Form(props) {
    return (
        <form action={props.action} method={props.method} onSubmit={props.onSubmit}>
            {props.children}
        </form>
    )
}