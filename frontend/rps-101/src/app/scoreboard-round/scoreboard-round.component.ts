import { Component, Input } from '@angular/core';
import { BattleOutcome, PlayerResult } from 'app/models/BattleOutcome';

@Component({
  selector: 'app-scoreboard-round',
  templateUrl: './scoreboard-round.component.html',
  styleUrls: ['./scoreboard-round.component.scss'],
})
export class ScoreboardRoundComponent {
  @Input() roundNumber!: number;
  @Input() roundResult!: BattleOutcome;

  playerCard: string = '';
  enemyCard: string = '';
  resultClass: string = '';
  cardsClass: string = '';

  ngOnChanges() {
    if (!this.roundResult) {
      this.cardsClass = 'card empty-card';
      return;
    }

    this.cardsClass = 'card';

    switch (this.roundResult.playerResult) {
      case PlayerResult.WIN:
        this.playerCard = this.roundResult.winner;
        this.enemyCard = this.roundResult.loser;
        this.resultClass = 'win';
        break;
      case PlayerResult.LOSE:
        this.playerCard = this.roundResult.loser;
        this.enemyCard = this.roundResult.winner;
        this.resultClass = 'lose';
        break;
      case PlayerResult.DRAW:
        this.playerCard = this.enemyCard = this.roundResult.winner;
        this.resultClass = 'draw';
    }
  }
}
