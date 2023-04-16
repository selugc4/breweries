export interface CardOutcomes {
    card: string;
    winningOutcomes: WinningOutcome[];
}

export interface WinningOutcome {
    outcome: string;
    losingCard: string;
}
