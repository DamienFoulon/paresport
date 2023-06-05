import './BetBoard.scss';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { betsAtom } from '../../atoms/atoms';

export default function BetBoard({ bets }) {
    const { t } = useTranslation();
    const [ localBetList, setLocalBetList ] = useRecoilState(betsAtom);

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
                                    <input type="number" defaultValue={bet.amount} />
                                </td>
                                <div className={'line-hover'} onClick={deleteBet}>
                                    <i className={'icon-trash-solid'}></i>
                                </div>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
            <div className='bet-board-footer'>
                <button className='btn btn-primary red-button'>{t('Place bets')}</button>
            </div>
        </div>
    );
}
