import React, { createContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import QuestTable from './QuestTable/QuestTable';
import './App.css'
import Player from './models/player';
import { PlayersContext } from './PlayersContext';
import axios from 'axios';
import {BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes} from 'react-router-dom'
import SkillsTable from './SkillsTable/SkillsTable';
import Navbar from './common/Navbar';
import { SlowBuffer } from 'buffer';

const PLAYER_NAMES = [
  "Pale_Taupe",
  "CitronZest",
  "OvertlyOlive",
  "Plum Custard"
]

function App() {
  const [playerData, setPlayerData] = useState<Player[]>([])
  
  useEffect(() => {(async () => {
    const players = (await Promise.all(
        PLAYER_NAMES.map(name => axios.get(`https://sync.runescape.wiki/runelite/player/${name}/STANDARD`))
    )).map(response => response.data)

    setPlayerData(players)
  })()}, [])

  const Home = () => (
    <div style={{padding: '1rem'}}>
      <h1>Dulux samples</h1>
      <p>Welcome to the home of the Dulux Samples. Probably the greatest Hardcore Group Ironman ever made.</p>
      <h2>Deaths</h2>
      <ol>
        <li>Plum Custard was brutally massacred by a Hobgoblin in Zeah.</li>
        <li>Plum Custard was sniped at the wildy lever by Ximoua.</li>
        <li>OvertlyOlive followed a terrible tutorial on how to safespot a Troll General by Pale Taupe, leading to being killed in one hit by a 29.</li>
      </ol>
      <h2>Notable drops</h2>
      <ul>
        <li>Pale Taupe is feeling more secure with his emotional support Imcando Hammer.</li>
        <li>OvertlyOlive is looking suave in his new mole slippers.</li>
      </ul>
    </div>
  )

  return (
    <PlayersContext.Provider value={playerData}>
      <BrowserRouter basename='group-ironman-stats'>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" Component={Home}/>
            <Route path="/quests" Component={QuestTable} />
            <Route path="/skills" Component={SkillsTable} /> 
          </Routes>
        </main>
      </BrowserRouter>
    </PlayersContext.Provider>
  );
}

export default App;