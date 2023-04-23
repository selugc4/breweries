import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CardApiService } from 'app/services/card-api.service';
import { DeckApiService } from 'app/services/deck-api.service';
import { RandomDeckService } from '../services/random-deck.service';
import { Deck } from 'app/models/Deck';
import { GameService } from 'app/services/game.service';
import { GameMode } from 'app/models/GameMode';
import { BattleOutcome, PlayerResult } from 'app/models/BattleOutcome';
import { Observable, lastValueFrom } from 'rxjs';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  @Input() gamemode: GameMode = GameMode.Exposed;
  @Input() playerDeck!: Deck;

  constructor(
    private randomDeckService: RandomDeckService,
    private cardApiService: CardApiService,
    private gameService: GameService,
    private deckApiService: DeckApiService
  ) {}

  //Spinner Properties
  spinnerMode: ProgressSpinnerMode = 'determinate';
  spinnerValue = 100;

  //Timer related Properties
  ROUND_TIME: number = 60;
  timerInterval: any;
  currentRoundTime: number = this.ROUND_TIME;
  isPausedTimer: boolean = false;
  currentGlobalTime: number = 0;
  isGameOver: boolean = false;

  //Round related Properties
  currentRound: number = 0;
  roundOutcome!: BattleOutcome;
  roundHistory: BattleOutcome[] = [];

  //Deck & Card related Properties
  enemyDeck!: Deck;
  indexEnemyCard: number = -1;
  playerDeckInGame!: Deck; //Use this Variable for all the ingame actions of the player Deck
  indexPlayerCard: number = -1;
  selectedCardDetails: string = '';

  userName: string = '';
  enemyName: string = '';
  isPausedGame: boolean = false;
  isLoading: boolean = true;

  ngOnInit() {
    this.startGame();
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload($event: any) {
    if (true) {
      $event.returnValue = true;
      return true;
    }
  }

  async playCard(cardIndex: number) {
    if (this.isPausedTimer) {
      return;
    }

    this.pauseTimer();

    this.indexEnemyCard = Math.floor(Math.random() * (5 - this.currentRound));
    this.indexPlayerCard = cardIndex;
    this.throwCards(cardIndex, this.indexEnemyCard);

    const enemyCard = this.enemyDeck.cards[this.indexEnemyCard];
    const playerCard = this.playerDeckInGame.cards[cardIndex];

    this.roundOutcome = await this.getBattleResult(playerCard, enemyCard);
    this.roundHistory[this.currentRound] = this.roundOutcome;

    this.displayRoundResult();
  }

  throwCards(userId: number, oponentId: number) {
    const playerCard = document.querySelector('#user-card-' + userId);
    const oponentCard = document.querySelector('#oponent-card-' + oponentId);
    playerCard?.classList.remove('user-card');
    playerCard?.classList.add('throw-user-card');
    oponentCard?.classList.remove('oponent-card');
    oponentCard?.classList.add('throw-oponent-card');
  }

  displayRoundResult() {
    const roundResultComponent = document.getElementById('roundResult');
    setTimeout(() => {
      roundResultComponent?.classList.add('show-round-result');
    }, 250);
  }

  closeRoundResult() {
    const roundResultComponent = document.getElementById('roundResult');
    roundResultComponent?.classList.remove('show-round-result');
    this.removePlayedCards();
    this.nextRound();
  }

  removePlayedCards() {
    this.enemyDeck.cards.splice(this.indexEnemyCard, 1);
    this.playerDeckInGame.cards.splice(this.indexPlayerCard, 1);
  }

  startGame() {
    this.isLoading = true;

    this.currentRoundTime = this.ROUND_TIME;
    this.spinnerValue = 100;
    this.roundHistory = [];
    this.roundHistory.length = 5;
    this.currentRound = 0;
    this.currentGlobalTime = 0;
    this.isPausedTimer = false;
    this.isPausedGame = false;
    this.isGameOver = false;

    this.selectedCardDetails = '';

    this.randomDeckService.getRandomDeck().subscribe((result) => {
      this.enemyDeck = result;
      this.isLoading = false;
    });
    this.playerDeckInGame = structuredClone(this.playerDeck);

    this.indexEnemyCard = -1;
    this.indexPlayerCard = -1;
    this.selectedCardDetails = '';

    this.userName = 'ANONYMOUS'; //TODO: Load names with scrapping
    this.enemyName = 'ROCKBOT';

    this.startTimer();
  }

  endGame(replay: boolean = false, gameResult: PlayerResult) {
    if (this.playerDeck.id != -1) {
      switch (gameResult) {
        case PlayerResult.WIN:
          this.playerDeck.wins++;
          break;
        case PlayerResult.LOSE:
          this.playerDeck.loses++;
          break;
        case PlayerResult.DRAW:
          this.playerDeck.draws++;
          break;
      }

      this.deckApiService
        .updateDeck(this.playerDeck.id, this.playerDeck)
        .subscribe((response) => {
          //TODO: Validate response
        });
    }

    if (replay) {
      this.startGame();
    } else {
      this.exitGame();
    }
  }

  exitGame() {
    this.gameService.endGame();
  }

  startTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (!this.isPausedTimer) {
        this.currentGlobalTime = this.currentGlobalTime + 0.1;
        this.currentRoundTime = this.currentRoundTime - 0.1;
        this.spinnerValue = this.currentRoundTime / (this.ROUND_TIME / 100);
        if (this.spinnerValue <= 0) {
          this.playCard(0);
        }
      }
    }, 100);
  }

  pauseTimer() {
    this.isPausedTimer = true;
  }

  resumeTimer() {
    this.isPausedTimer = false;
  }

  pauseGame() {
    this.pauseTimer();
    this.isPausedGame = true;
  }

  resumeGame() {
    this.resumeTimer();
    this.isPausedGame = false;
  }

  nextRound() {
    if (this.currentRound >= 4) {
      this.isGameOver = true;
    } else {
      this.currentRoundTime = this.ROUND_TIME;
      this.currentRound++;
      this.resumeTimer();
    }
  }

  getCardWinDetails(index: number, event: MouseEvent) {
    event.preventDefault();
    const selectedCard = this.playerDeckInGame.cards[index];

    if (this.selectedCardDetails === selectedCard) {
      this.selectedCardDetails = '';
    } else {
      this.selectedCardDetails = selectedCard;
    }
  }

  async getBattleResult(
    playerCard: string,
    enemyCard: string
  ): Promise<BattleOutcome> {
    let outcome = await lastValueFrom(
      this.cardApiService.getBattleResult(
        playerCard,
        enemyCard
      ) as Observable<BattleOutcome>
    );

    if (outcome.winner === playerCard) {
      outcome.playerResult = PlayerResult.WIN;
    } else if (outcome.loser === playerCard) {
      outcome.playerResult = PlayerResult.LOSE;
    } else {
      outcome.playerResult = PlayerResult.DRAW;
    }

    return outcome;
  }
}
