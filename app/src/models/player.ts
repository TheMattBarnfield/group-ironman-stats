interface Player {
    username: string,
    quests: {[questName: string]: number | undefined},
    achievement_diaries: any
    levels: any
}

export default Player;