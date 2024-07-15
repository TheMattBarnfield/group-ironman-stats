import React, { useContext } from 'react'
import { PlayersContext } from '../PlayersContext';
import './SkillsTable.css'

const QuestTable: React.FC = () => {
    const playerData = useContext(PlayersContext);

    if (!playerData.length) {
        return <div>Loading...</div>
    }

    const skills = Object.keys(playerData[0].levels).sort((a,b) => a.localeCompare(b));

    const tableRows = skills.map(skill => ({
        skill,
        levels: playerData.map(p => p.levels[skill]),
    }))

    return <div id="skills-list">
        <table>
            <thead>
                <tr>
                    <td>Skill</td>
                    {playerData.map(p => <td className="skill-level">{p.username.replaceAll("_", " ")}</td>)}
                </tr>
            </thead>
            <tbody>
                {tableRows.map(row => (<tr>
                    <td className="skill-name">{row.skill}</td>
                    {row.levels.map(l => <td className={row.levels.every(l2 => l >= l2) ? "highest skill-level" : "skill-level"}>{l}</td>)}
                </tr>))}
            </tbody>
        </table>
    </div>
}

export default QuestTable;