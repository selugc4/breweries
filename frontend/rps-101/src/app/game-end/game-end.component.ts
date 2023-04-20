import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BattleOutcome, PlayerResult } from 'app/models/BattleOutcome';
import { Deck } from 'app/models/Deck';

@Component({
  selector: 'app-game-end',
  templateUrl: './game-end.component.html',
  styleUrls: ['./game-end.component.scss'],
})
export class GameEndComponent {
  @Input() roundHistory: BattleOutcome[] = [];
  @Output() replayClickEvent = new EventEmitter<PlayerResult>();
  @Output() exitClickEvent = new EventEmitter<PlayerResult>();

  message: string = '';
  footerMessage: string = '';

  resultTitle: string = '';
  resultClass: string = '';
  resultMessage: string = '';

  roundCards: [string, string][] = [];
  gameResult!: PlayerResult;

  ngOnInit() {
    let wins = 0;
    let losses = 0;
    let draws = 0;
    for (let index = 0; index < this.roundHistory.length; index++) {
      const round = this.roundHistory[index];

      switch (round.playerResult) {
        case PlayerResult.WIN:
          this.roundCards.push([round.winner, round.loser]);
          wins++;
          break;
        case PlayerResult.LOSE:
          this.roundCards.push([round.loser, round.winner]);
          losses++;
          break;
        case PlayerResult.DRAW:
          this.roundCards.push([round.winner, round.winner]);
          draws++;
          break;
      }
    }

    if (wins > losses) {
      this.resultTitle = 'WIN';
      this.resultMessage =
        "Congratulations, you've won this match of JANKEN 101!";
      this.resultClass = 'win';
      this.gameResult = PlayerResult.WIN;
    } else if (losses > wins) {
      this.resultTitle = 'LOST';
      this.resultMessage =
        'Oops! You lost this match of JANKEN 101. Better luck next time!';
      this.resultClass = 'lose';
      this.gameResult = PlayerResult.LOSE;
    } else {
      this.resultTitle = 'DRAW';
      this.resultMessage =
        "It's a tie! You and your opponent both played well in this match of JANKEN 101.";
      this.resultClass = 'draw';
      this.gameResult = PlayerResult.DRAW;
    }

    this.footerMessage =
      'To continue playing and unlock great advantages such as viewing 101 cards, creating your own decks, and accessing all game modes, please sign up now.';
  }

  clickReplay() {
    this.replayClickEvent.emit(this.gameResult);
  }

  clickExit() {
    this.exitClickEvent.emit(this.gameResult);
  }
}
