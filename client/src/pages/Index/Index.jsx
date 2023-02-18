import './Index.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import Navbar from '../../components/Navbar/Navbar'
import Searchbar from '../../components/Searchbar/Searchbar'
import List from '../../components/List/List'
import Item from '../../components/List/Item/Item'
import Banner from '../../components/Banner/Banner'
import Match from '../../components/Match/Match'

export default function Index() {
    const { i18n } = useTranslation()
    const urlLang = window.location.pathname.split('/')[1]
    if (urlLang !== i18n.language) {
        i18n.changeLanguage(urlLang)
    }

    const [matches, setMatches] = React.useState([{}])

    React.useEffect(() => {
        fetch('/api/valorant/matches?sort=upcoming')
            .then((response) => response.json())
            .then((data) => setMatches(data))
    }, [])

    return (
        <>
            <Navbar />
            <div className="container row">
                <div className="left-container col">
                    <Searchbar
                        placeholder={'Search a match'}
                        icon={'icon-magnifying-glass-solid'}
                    />
                    <List title={'Top competitions'}>
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
                            gameIcon={'csgo'}
                            competitionIcon={'csgo-esl'}
                            competitionName={'CS:GO ESL'}
                        />
                        <Item
                            gameIcon={'csgo'}
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
                            competitionIcon={'valorant-cdf'}
                            competitionName={'Valorant Coupe de France'}
                        />
                    </List>
                    <List title={'Games'}>
                        <Item
                            gameIcon={'valorant'}
                            competitionName={'Valorant'}
                        />
                        <Item gameIcon={'csgo'} competitionName={'CS:GO'} />
                    </List>
                </div>
                <div className="mid-container col">
                    <Banner
                        title={'Get free coins'}
                        description={'You can claim free coins every days !'}
                    />
                    <div className="biggest-daily-matchs row">
                        {matches.length > 1 ? (
                            <>
                                <Match
                                    matchTitle={
                                        matches[0].name +
                                        ' - ' +
                                        matches[0].league.name +
                                        ' ' +
                                        matches[0].serie.full_name
                                    }
                                    matchGame={
                                        matches.length > 1
                                            ? matches[0].videogame.slug
                                            : ''
                                    }
                                    matchCompetition={
                                        matches.length > 1
                                            ? matches[0].serie.slug
                                            : ''
                                    }
                                    team1={
                                        matches.length > 1
                                            ? matches[0].opponents[0]
                                                ? matches[0].opponents[0]
                                                      .opponent.name.length > 13
                                                    ? matches[0].opponents[0].opponent.name.slice(
                                                          0,
                                                          13
                                                      ) + '...'
                                                    : matches[0].opponents[0]
                                                          .opponent.name
                                                : 'TBD'
                                            : ''
                                    }
                                    odd1={'2.25'}
                                    oddDraw={'1.30'}
                                    team2={
                                        matches.length > 1
                                            ? matches[0].opponents[1]
                                                ? matches[0].opponents[1]
                                                      .opponent.name.length > 13
                                                    ? matches[0].opponents[1].opponent.name.slice(
                                                          0,
                                                          13
                                                      ) + '...'
                                                    : matches[0].opponents[1]
                                                          .opponent.name
                                                : 'TBD'
                                            : ''
                                    }
                                    odd2={'0.75'}
                                />
                                <Match
                                    matchTitle={
                                        matches[1].name +
                                        ' - ' +
                                        matches[1].league.name +
                                        ' ' +
                                        matches[1].serie.full_name
                                    }
                                    matchGame={
                                        matches.length > 1
                                            ? matches[1].videogame.slug
                                            : ''
                                    }
                                    matchCompetition={
                                        matches.length > 1
                                            ? matches[1].serie.slug
                                            : ''
                                    }
                                    team1={
                                        matches.length > 1
                                            ? matches[1].opponents[0].opponent
                                                ? matches[1].opponents[0]
                                                      .opponent.name.length > 13
                                                    ? matches[1].opponents[0].opponent.name.slice(
                                                          0,
                                                          13
                                                      ) + '...'
                                                    : matches[1].opponents[0]
                                                          .opponent.name
                                                : 'TBD'
                                            : ''
                                    }
                                    odd1={'2.25'}
                                    oddDraw={'1.30'}
                                    team2={
                                        matches.length > 1
                                            ? matches[1].opponents[1]
                                                ? matches[1].opponents[1]
                                                      .opponent.name.length > 13
                                                    ? matches[1].opponents[1].opponent.name.slice(
                                                          0,
                                                          13
                                                      ) + '...'
                                                    : matches[1].opponents[1]
                                                          .opponent.name
                                                : 'TBD'
                                            : ''
                                    }
                                    odd2={'0.75'}
                                />
                            </>
                        ) : (
                            <div className="loader"></div>
                        )}
                    </div>
                </div>
                <div className="right-container col"></div>
            </div>
        </>
    )
}
