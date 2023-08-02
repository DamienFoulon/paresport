import './Match.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'
import { betsAtom } from '../../atoms/atoms'

export default function Match(props) {
    const urlLang = window.location.pathname.split('/')[1]
    let lang = urlLang ? `${urlLang.toLowerCase()}-${urlLang.toUpperCase()}` : null
    let startTime = new Date(props.startTime)
    const { t } = useTranslation()
    const [ bets, setBets ] = useRecoilState(betsAtom)

    const addBet = async (e) => {
        const betId = Math.floor(Math.random() * 1000000000000000000 + 1);
        const team = {
            id: e.currentTarget.dataset.teamId,
            slug: e.currentTarget.dataset.teamSlug,
        };
        const match = {
            id: e.currentTarget.parentNode.parentNode.parentNode.dataset.matchId,
            name: e.currentTarget.parentNode.parentNode.parentNode.dataset.matchName,
        };

        const bet = {
            id: betId,
            match: { id: match.id, name: match.name },
            team: { id: team.id, slug: team.slug },
            amount: 0,
        };

        const storedBets = localStorage.getItem('bets');
        const updatedBets = storedBets ? [...JSON.parse(storedBets), bet] : [bet];

        localStorage.setItem('bets', JSON.stringify(updatedBets));
        setBets(updatedBets);
    };

    return (
        <div className='match' data-match-id={props.matchId} data-match-name={props.matchTitle}>
            <div className='team1'>
                <div className='team-info'>
                    <div className='match-team-logo'>
                        <img src={props.team1.image.replace('http://', 'https://')} alt={'logo ' + props.team1.name} title={props.team1.name} />
                    </div>
                    <p>{props.team1.slug}</p>
                </div>
                <div className='bet-part'>
                    <button className="bet-match-button team1" data-team-id={props.team1.id} data-team-slug={props.team1.slug} onClick={addBet}>
                        <p className="bet-match-button-odds">
                            {props.odd1}
                        </p>
                    </button>
                </div>
            </div>
            <div className='draw'>
                <div className='bet-part'>
                    <button className="bet-match-button draw" data-team-id={"DRAW"} data-team-slug={'DRAW'} onClick={addBet}>
                        <p className="bet-match-button-odds">
                            {props.oddDraw}
                        </p>
                    </button>
                </div>
            </div>
            <div className='team2'>
                <div className='team-info'>
                    <div className='match-team-logo'>
                        <img src={props.team2.image.replace('http://', 'https://')} alt={'logo ' + props.team2.name} title={props.team2.name} />
                    </div>
                    <p>{props.team2.slug}</p>
                </div>
                <div className='bet-part'>
                    <button className="bet-match-button team1" data-team-id={props.team2.id} data-team-slug={props.team2.slug} onClick={addBet}>
                        <p className="bet-match-button-odds">
                            {props.odd2}
                        </p>
                    </button>
                </div>
            </div>
        </div>
    )
        // <div className="biggest-daily-match" data-match-id={props.matchId} data-match-name={props.matchTitle}>
        //     <div className="biggest-daily-match-header" data-start-time={props.startTime}>
        //         <div className='hover-content'>
        //             <p className='startTime'>
        //                 {
        //
        //                     new Date(startTime)
        //                         .toLocaleString(lang ? lang : 'en-UK', {
        //                         weekday: 'long',
        //                         month: 'long',
        //                         day: 'numeric',
        //                         hour: 'numeric',
        //                         minute: 'numeric',
        //                         hour12: false,
        //                         timeZone: 'Europe/Paris'
        //                     }).toUpperCase()
        //                 }
        //             </p>
        //         </div>
        //         <img
        //             src={`https://api.paresport.com/img/competitions/banner/${props.matchGame}/${props.matchCompetition.slug}.png`}
        //             alt=""
        //         />
        //     </div>
        //     <div className="biggest-daily-match-body">
        //         <div className="biggest-daily-match-title row">
        //             <img
        //                 src={`https://api.paresport.com//img/games/icons/${props.matchGame}.png`}
        //                 alt=""
        //             />
        //             <img
        //                 src={`https://api.paresport.com/img/competitions/icons/${props.matchGame}/${props.matchCompetition.slug}.png`}
        //                 alt=""
        //             />
        //             <p>
        //                 {props.matchTitle.split(' ').map((word) => {
        //                     return t(word) + ' '
        //                 })}
        //             </p>
        //         </div>
        //         <div className="biggest-daily-match-teams">
        //             <div className="biggest-daily-match-team1">
        //                 <p>{props.team1.slug}</p>
        //             </div>
        //             <div className="biggest-daily-match-team2">
        //                 <p>{props.team2.slug}</p>
        //             </div>
        //         </div>
        //         <div className="biggest-daily-match-buttons">
        //             <button className="biggest-daily-match-button team1" data-team-id={props.team1.id} data-team-slug={props.team1.slug} onClick={addBet}>
        //                 <p className="biggest-daily-match-button-teamName">
        //                     {props.team1.slug}
        //                 </p>
        //                 <p className="biggest-daily-match-button-odds">
        //                     {props.odd1}
        //                 </p>
        //             </button>
        //             <button className="biggest-daily-match-button draw" data-team-id={"DRAW"} data-team-slug={'DRAW'} onClick={addBet}>
        //                 <p className="biggest-daily-match-button-teamName">
        //                     {t('Draw')}
        //                 </p>
        //                 <p className="biggest-daily-match-button-odds">
        //                     {props.oddDraw}
        //                 </p>
        //             </button>
        //             <button className="biggest-daily-match-button team2" data-team-id={props.team2.id} data-team-slug={props.team2.slug} onClick={addBet}>
        //                 <p className="biggest-daily-match-button-teamName">
        //                     {props.team2.slug}
        //                 </p>
        //                 <p className="biggest-daily-match-button-odds">
        //                     {props.odd2}
        //                 </p>
        {/*            </button>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*</div>*/}
}
