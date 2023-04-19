export interface BattleOutcome {
    winner: string;
    outcome: string;
    loser: string;
    playerResult: PlayerResult;
}

export enum PlayerResult {
    WIN = "WIN",
    LOSE = "LOSE",
    DRAW = "DRAW"
}
