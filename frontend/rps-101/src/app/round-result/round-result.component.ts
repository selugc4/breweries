import { Component, Input } from '@angular/core';
import { BattleOutcome, PlayerResult } from 'app/models/BattleOutcome';

@Component({
  selector: 'app-round-result',
  templateUrl: './round-result.component.html',
  styleUrls: ['./round-result.component.scss'],
})
export class RoundResultComponent {
  @Input() roundOutcome!: BattleOutcome;

  playerCard: string = '';
  enemyCard: string = '';
  titleMessage: string = '';
  titleClass: string = '';

  ngOnChanges() {
    if (!this.roundOutcome) {
      return;
    }

    switch (this.roundOutcome.playerResult) {
      case PlayerResult.WIN:
        this.playerCard = this.roundOutcome.winner;
        this.enemyCard = this.roundOutcome.loser;
        this.titleMessage = 'YOU WIN';
        this.titleClass = 'win';
        break;
      case PlayerResult.LOSE:
        this.playerCard = this.roundOutcome.loser;
        this.enemyCard = this.roundOutcome.winner;
        this.titleMessage = 'YOU LOSE';
        this.titleClass = 'lose';
        break;
      case PlayerResult.DRAW:
        this.playerCard = this.enemyCard = this.roundOutcome.winner;
        this.titleMessage = 'DRAW';
        this.titleClass = 'draw';
    }
  }
}
