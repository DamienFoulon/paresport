import './Index.scss'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Navbar from '../../components/Navbar/Navbar'
import Searchbar from '../../components/Searchbar/Searchbar'
import List from '../../components/List/List'
import Item from '../../components/List/Item/Item'
import Banner from '../../components/Banner/Banner'
import BigMatch from '../../components/BigMatch/BigMatch'
import Match from '../../components/Match/Match'
import BetBoard from '../../components/BetBoard/BetBoard'
import { useRecoilValue, useRecoilState } from 'recoil'
import { userAtom } from '../../atoms/atoms'
import { betsAtom } from '../../atoms/atoms'

export default function Index() {
    const user = useRecoilValue(userAtom)
    const { t, i18n } = useTranslation()
    const urlLang = window.location.pathname.split('/')[1]
    let lang = `${urlLang.toLowerCase()}/${urlLang.toUpperCase()}`
    if (urlLang !== i18n.language) {
        i18n.changeLanguage(urlLang)
    }

    const [matches, setMatches] = useState([{}])

    useEffect(() => {
        fetch('https://api.paresport.com/api/valorant/matches?sort=upcoming')
            .then((response) => response.json())
            .then((data) => setMatches(data))
    }, [])

    const [betList, setBetList] = useRecoilState(betsAtom)
    // Log betList every time it changes
    useEffect(() => {
        console.log(betList)
    }, [betList])

    return (
        <>
            <Navbar />
            <div className="container row">
                <div className="left-container col">
                    <Searchbar
                        placeholder={'Search a match'}
                        icon={'icon-magnifying-glass-solid'}
                    />
                    <List className='competitions-list' title={'Top competitions'}>
                        <Item
                            gameIcon={'league-of-legends'}
                            competitionIcon={'lol-lec'}
                            competitionName={'League of Legend LEC'}
                        />
                        <Item
                            gameIcon={'league-of-legends'}
                            competitionIcon={'lol-lcs'}
                            competitionName={'League of Legend LCS'}
                        />
                        <Item
                            gameIcon={'cs-go'}
                            competitionIcon={'csgo-esl'}
                            competitionName={'CS:GO ESL'}
                        />
                        <Item
                            gameIcon={'cs-go'}
                            competitionIcon={'csgo-esea'}
                            competitionName={'CS:GO ESEA'}
                        />
                        <Item
                            gameIcon={'valorant'}
                            competitionIcon={'valorant-masters'}
                            competitionName={'Valorant Masters'}
                        />
                        <Item
                            gameIcon={'valorant'}
                            competitionIcon={'vct_emea'}
                            competitionName={'Valorant VCT EMEA'}
                        />
                    </List>
                    <List className='games-list' title={'Games'}>
                        <Item
                            gameIcon={'valorant'}
                            competitionName={'Valorant'}
                        />
                        <Item
                            gameIcon={'cs-go'}
                            competitionName={'CS:GO'}
                        />
                        <Item
                            gameIcon={'league-of-legends'}
                            competitionName={'League of Legends'}
                        />
                    </List>
                </div>
                <div className="mid-container col">
                    <Banner
                        title={'Get free coins'}
                        description={'You can claim free coins every days !'}
                    />
                    <div className='matchs-container'>
                        <div className="biggest-daily-matchs">
                            {matches.length > 1 ? (
                                <>
                                    <BigMatch
                                        startTime={
                                            matches[0].startTime ? matches[0].startTime : 'TBD'
                                        }
                                        matchId={
                                            matches[0].id ? matches[0].id : 'TBD'
                                        }
                                        matchTitle={
                                            matches[0].name ? matches[0].name : 'TBD'
                                        }
                                        matchGame={
                                            matches[0].game ? matches[0].game : 'TBD'
                                        }
                                        matchCompetition={
                                            matches[0].league ? matches[0].league : 'TBD'
                                        }
                                        team1={
                                            matches[0].team1 ? matches[0].team1 : 'TBD'
                                        }
                                        odd1={'2.25'}
                                        oddDraw={'1.30'}
                                        team2={
                                            matches[0].team2 ? matches[0].team2 : 'TBD'
                                        }
                                        odd2={'0.75'}
                                    />
                                    <BigMatch
                                        startTime={
                                            matches[1].startTime ? matches[1].startTime : 'TBD'
                                        }
                                        matchId={
                                            matches[1].id ? matches[1].id : 'TBD'
                                        }
                                        matchTitle={
                                            matches[1].name ? matches[1].name : 'TBD'
                                        }
                                        matchGame={
                                            matches[1].game ? matches[1].game : 'TBD'
                                        }
                                        matchCompetition={
                                            matches[1].league ? matches[1].league : 'TBD'
                                        }
                                        team1={
                                            matches[1].team1 ? matches[1].team1.id : 'TBD'
                                        }
                                        odd1={'2.25'}
                                        oddDraw={'1.30'}
                                        team2={
                                            matches[1].team2 ? matches[1].team2.id : 'TBD'
                                        }
                                        odd2={'0.75'}
                                    />
                                </>
                            ) : (
                                <div className="loader"></div>
                            )}
                        </div>
                        <div className='upcoming-matches'>
                            {matches.length > 1 ? (
                                matches.map((match, index) => {
                                    if (
                                        index > 1 &&
                                        (match.team1 && match.team1.slug !== 'TBD') &&
                                        (match.team2 && match.team2.slug !== 'TBD')
                                    ) {
                                        return(
                                            <Match
                                                matchId={
                                                    match.id ? match.id : 'TBD'
                                                }
                                                matchTitle={
                                                    match.name ? match.name : 'TBD'
                                                }
                                                matchGame={
                                                    match.game ? match.game : 'TBD'
                                                }
                                                matchCompetition={
                                                    match.league ? match.league : 'TBD'
                                                }
                                                team1={
                                                    match.team1 ? match.team1 : 'TBD'
                                                }
                                                odd1={'2.25'}
                                                oddDraw={'1.30'}
                                                team2={
                                                    match.team2 ? match.team2 : 'TBD'
                                                }
                                                odd2={'0.75'}
                                            />
                                        )
                                    }
                                })
                            ) : (<div className='loader'></div>)}
                        </div>
                    </div>
                </div>
                <div className="right-container col">
                    <BetBoard bets={betList} />
                </div>
            </div>
        </>
    )
}
