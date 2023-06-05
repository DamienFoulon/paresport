import { atom } from 'recoil'
import Cookies from 'js-cookie'

export const isAuthenticatedAtom = atom({
    key: 'isAuthenticated',
    default: false
})

export const userAtom = atom({
    key: 'user',
    default: {
        token: Cookies.get('userToken'),
    }
})

export const betsAtom = atom({
    key: 'bets',
    default: JSON.parse(localStorage.getItem('bets')) ? JSON.parse(localStorage.getItem('bets')) : []
})