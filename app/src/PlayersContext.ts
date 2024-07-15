import { createContext } from "react";
import Player from "./models/player";

export const PlayersContext = createContext<Player[]>([]);