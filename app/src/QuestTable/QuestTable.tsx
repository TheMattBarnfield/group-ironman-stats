import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Player from '../models/player';
import { PlayersContext } from '../PlayersContext';
import Checkbox from './Checkbox';
import CheckCell from './CheckCell';
import CrossCell from './CrossCell';
import './QuestTable.css'

const QuestTable: React.FC = () => {
    const playerData = useContext(PlayersContext);
    const [showCompleted, setShowCompleted] = useState<boolean>(true);
    const [showStarted, setShowStarted] = useState<boolean>(true);
    const [showUnstarted, setShowUnstarted] = useState<boolean>(true);
    const [activePlayer, setActivePlayer] = useState<string>("n/a");

    

    if (!playerData.length) {
        return <div>Loading...</div>
    }

    const quests = Object.keys(playerData[0].quests).sort((a,b) => a.replaceAll("The ", "").replaceAll("A ", "").localeCompare(b.replaceAll("The ", "").replaceAll("A ", "")));

    const tableRows = quests.map(quest => ({
        quest,
        completions: playerData.map(p => p.quests[quest] == 2)
    }))
    .filter(row => showCompleted || !row.completions.every(x=>x))
    .filter(row => showStarted || row.completions.every(x=>x) || !row.completions.some(x=>x))
    .filter(row => showUnstarted || row.completions.some(x=>x))
    .filter(row => !(playerData.find(p => p.username == activePlayer)?.quests[row.quest] == 2))

    return <div id="quest-list">
        <div className="filters">
            <Checkbox label="Show completed" checked={showCompleted} onChange={() => setShowCompleted(v => !v)}/>
            <Checkbox label="Show started" checked={showStarted} onChange={() => setShowStarted(v => !v)}/>
            <Checkbox label="Show unstarted" checked={showUnstarted} onChange={() => setShowUnstarted(v => !v)}/>
        </div>
        <div className="filters">
            <label>
                Hide completed by: 
                <select value={activePlayer} onChange={e => setActivePlayer(e.target.value)}>
                    <option value="n/a">n/a</option>
                    {playerData.map(player => <option value={player.username}>{player.username.replaceAll("_", " ")}</option>)}
                </select>
            </label>
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