import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Player from '../models/player';
import Checkbox from './Checkbox';
import CheckCell from './CheckCell';
import CrossCell from './CrossCell';
import './QuestTable.css'

const PLAYER_NAMES = [
    "Pale_Taupe",
    "CitronZest"
]

const QuestTable: React.FC = () => {
    const [playerData, setPlayerData] = useState<Player[]>([])
    const [showCompleted, setShowCompleted] = useState<boolean>(true);
    const [showStarted, setShowStarted] = useState<boolean>(true);
    const [showUnstarted, setShowUnstarted] = useState<boolean>(true);

    useEffect(() => {(async () => {
        const players = (await Promise.all(
            PLAYER_NAMES.map(name => axios.get(`https://sync.runescape.wiki/runelite/player/${name}/STANDARD`))
        )).map(response => response.data)

        setPlayerData(players)
    })()}, [])

    if (!playerData.length) {
        return <div>Loading...</div>
    }

    const quests = Object.keys(playerData[0].quests).sort((a,b) => a.replaceAll("The ", "").localeCompare(b.replaceAll("The ", "")));

    const tableRows = quests.map(quest => ({
        quest,
        completions: playerData.map(p => p.quests[quest] == 2)
    }))
    .filter(row => showCompleted || !row.completions.every(x=>x))
    .filter(row => showStarted || row.completions.every(x=>x) || !row.completions.some(x=>x))
    .filter(row => showUnstarted || row.completions.some(x=>x))

    return <div id="quest-list">
        <div className="filters">
            <Checkbox label="Show completed" checked={showCompleted} onChange={() => setShowCompleted(v => !v)}/>
            <Checkbox label="Show started" checked={showStarted} onChange={() => setShowStarted(v => !v)}/>
            <Checkbox label="Show unstarted" checked={showUnstarted} onChange={() => setShowUnstarted(v => !v)}/>
        </div>
        <table>
            <thead>
                <tr>
                    <td>Quest</td>
                    {playerData.map(p => <td className="quest-completion">{p.username.replaceAll("_", " ")}</td>)}
                </tr>
            </thead>
            <tbody>
                {tableRows.map(row => (<tr className={row.completions.every(x=>x) ? "complete-row" : row.completions.some(x=>x) ? "started-row" : "unstarted-row"}>
                    <td className="quest-name">{row.quest}</td>
                    {row.completions.map(c => c ? <CheckCell /> : <CrossCell />)}
                </tr>))}
            </tbody>
        </table>
    </div>
}

export default QuestTable;