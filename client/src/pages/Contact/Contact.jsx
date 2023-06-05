import './Contact.scss';
import React from 'react'
import { useRecoilValue } from 'recoil'
import { isAuthenticatedAtom, userAtom } from '../../atoms/atoms'
import Navbar from '../../components/Navbar/Navbar'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'

export default function Contact() {
  const isAuthenticated = useRecoilValue(isAuthenticatedAtom)
  const user = useRecoilValue(userAtom)

  return (
      <>
        <Navbar />
      </>
  )
}