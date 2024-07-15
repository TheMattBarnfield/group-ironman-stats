import React, { createContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import QuestTable from './QuestTable/QuestTable';
import './App.css'
import Player from './models/player';
import { PlayersContext } from './PlayersContext';
import axios from 'axios';

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

  return (
    <PlayersContext.Provider value={playerData}>
      <main>
        <QuestTable />
      </main>
    </PlayersContext.Provider>
  );
}

export default App;