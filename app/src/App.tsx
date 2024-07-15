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
  "CitronZest"
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
    <div style={{padding: '1rem'}}>Welcome to the home of the Dulux Samples. Probably the greatest Hardcore Group Ironman ever made.</div>
  )

  return (
    <PlayersContext.Provider value={playerData}>
      <BrowserRouter>
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