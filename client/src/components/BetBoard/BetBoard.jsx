import './BetBoard.scss';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { betsAtom } from '../../atoms/atoms';
import axios from 'axios';
import Cookies from 'js-cookie'

export default function BetBoard({ bets }) {
    const { t } = useTranslation();
    const [ user, setUser ] = useState({});
    const [ localBetList, setLocalBetList ] = useRecoilState(betsAtom);
    const [ isError, setIsError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ success, setSuccess ] = useState(false);
    const [ successMessage, setSuccessMessage ] = useState('');

    const deleteBet = (e) => {
        const betId = parseInt(e.target.closest('tr').dataset.betId);
        const updatedBets = JSON.parse(localStorage.getItem('bets')).filter(
            (bet) => bet.id !== betId
        );
        localStorage.setItem(
            'bets',
            JSON.stringify(
                updatedBets
            )
        );
        setLocalBetList(updatedBets);
    };

    useEffect(() => {
        setLocalBetList(bets);
    }, [bets])

    useEffect(() => {
        async function getUser() {
            const user = await axios.post('https://api.paresport.com/api/auth/getCredentials', { token: Cookies.get('userToken') }, {
                withCredentials: true,
            }).then((res) => {
                return res.data;
            });
            console.log('user :', await user);
            setUser(await user.user);
        }
        getUser();
    }, [errorMessage, successMessage]);

    const updateBet = (e) => {
        const betId = parseInt(e.target.closest('tr').dataset.betId);
        const updatedBets = JSON.parse(localStorage.getItem('bets')).map(
            (bet) => {
                if (bet.id === betId) {
                    bet.amount = parseInt(e.target.value);
                }
                return bet;
            }
        );
        localStorage.setItem(
            'bets',
            JSON.stringify(
                updatedBets
            )
        );
        setLocalBetList(updatedBets);
    }

    const placeBets = (e) => {
        const bets = JSON.parse(localStorage.getItem('bets'));
        bets.map((bet, index) => {
            axios.post('https://api.paresport.com/placeBet', {
                matchId: bet.match.id,
                teamId: bet.team.id,
                amount: bet.amount,
            },
            {
                withCredentials: true,
            }).then(async (res) => {
                setIsError(false)
                setSuccess(true)
                setSuccessMessage('Bet(s) placed successfully');
                if(index === bets.length - 1) {
                    localStorage.removeItem('bets');
                    setLocalBetList([]);
                }
            }).catch((err) => {
                setSuccess(false)
                setIsError(true)
                setErrorMessage('Error: ' + err.response.data.message);
            })
        })
    }

    return (
        <div className="bet-board">
            <div className="bet-board-header">
                <div className="bet-board-header-title">
                    <h2>{t("Bet's Board")}</h2>
                </div>
            </div>
            <div className="bet-board-body">
                <table>
                    <thead>
                    <tr>
                        <th className="col-match">{t('Match')}</th>
                        <th className="col-team">{t('Team')}</th>
                        <th className="col-amount">{t('Amount')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bets.map((bet, index) => {
                        return (
                            <tr key={index} data-bet-id={bet.id}>
                                <td className="col-match">{bet.match.name}</td>
                                <td className="col-team">{bet.team.slug}</td>
                                <td className="col-amount">
                                    <input type="number" defaultValue={bet.amount} onChange={updateBet} />
                                </td>
                                <div className={'line-hover'} onClick={deleteBet}>
                                    <i className={'icon-trash-solid'}></i>
                                </div>
                            </tr>
                        );
                    })}
                    {isError ? (
                        <div className="error-message">
                            {errorMessage} <br/>
                            (You can't bet more than {user.coins} coins.)
                        </div>
                    ) : null}
                    {success ? (
                        <div className="success-message">
                            {successMessage}
                        </div>
                    ) : null}
                    </tbody>
                </table>
            </div>
            <div className='bet-board-footer'>
                <button className='btn btn-primary red-button' onClick={placeBets}>{t('Place bets')}</button>
            </div>
        </div>
    );
}
