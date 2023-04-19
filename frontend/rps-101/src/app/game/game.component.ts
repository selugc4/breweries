import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MockObjectsService } from '../services/mock-objects.service';
import { CardApiService } from 'app/services/card-api.service';
import { RandomDeckService } from '../services/random-deck.service';
import { Deck } from 'app/models/Deck';
import { GameService } from 'app/services/game.service';
import { GameMode } from 'app/models/GameMode';
import { BattleOutcome, PlayerResult } from 'app/models/BattleOutcome';
import { Observable, lastValueFrom } from 'rxjs';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { ViewContainerRef } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  //animations: [
  //  trigger('scoreAnimation', [
  //    transition('chosenCard => usedCard', animate('1ms'))
  //  ])
  // ]
})
export class GameComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger | undefined;
  @Input() gamemode: GameMode = GameMode.Exposed;
  @Input() playerDeck!: Deck;

  constructor(
    private randomDeckService: RandomDeckService,
    private cardApiService: CardApiService,
    private gameService: GameService,
    private mockService: MockObjectsService
  ) {}

  //Spinner Properties
  spinnerMode: ProgressSpinnerMode = 'determinate';
  spinnerValue = 100;

  //Timer related Properties
  ROUND_TIME: number = 60;
  currentRoundTime: number = this.ROUND_TIME;
  isPausedTimer: boolean = false;
  currentGlobalTime: number = 0;

  //Round related Properties
  currentRound: number = 0;
  roundOutcome!: BattleOutcome;
  roundHistory: BattleOutcome[] = [];

  rightClickCard: boolean = false;

  activeDetails: boolean[] = Array(5);
  activeDetail: number = 5;

  //Deck & Card related Properties
  enemyDeck!: Deck;
  indexEnemyCard: number = -1;
  playerDeckInGame!: Deck; //Use this Variable for all the ingame actions of the player Deck
  indexPlayerCard: number = -1;
  selectedCardDetails: string = '';

  dialogText: string = 'END';
  dialogBlock: boolean = false;
  activeCard: boolean[] = Array(5);
  dialogEnd: boolean = false;
  putCard: boolean[] = Array(false, false, false, false, false);
  dialogStart: boolean = true;
  dialogResume: boolean = false;
  endText: string = '';
  rounds: string[][] = [];

  ngOnInit(): void {
    this.startMatch();
  }

  async playCard(cardIndex: number) {
    //TODO: Comprobar que no se puedan lanzar dos cartas a la vez

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
    const roundResultComponent = document.querySelector('.round-result');
    setTimeout(() => {
      roundResultComponent?.classList.add('show-round-result');
    }, 250);
  }

  closeRoundResult($event: MouseEvent) {
    $event.stopPropagation();
    const roundResultComponent = $event.currentTarget as HTMLElement;
    roundResultComponent?.classList.remove('show-round-result');
    this.removePlayedCards();
    this.nextRound();
  }

  removePlayedCards() {
    this.enemyDeck.cards.splice(this.indexEnemyCard, 1);
    this.playerDeckInGame.cards.splice(this.indexPlayerCard, 1);
    this.selectedCardDetails = '';
  }

  startMatch() {
    this.currentRoundTime = this.ROUND_TIME;
    this.roundHistory = [];
    this.roundHistory.length = 5;
    this.currentRound = 0;
    this.currentGlobalTime = 0;
    this.dialogStart = false;
    this.isPausedTimer = false;

    this.selectedCardDetails = '';
    this.enemyDeck = this.randomDeckService.getRandomDeck();
    this.playerDeckInGame = structuredClone(this.playerDeck);
    this.startTimer();
  }

  //TODO: Quitarlo para que se use siempre StartMatch
  restartMatch() {
    this.isPausedTimer = true;
    this.currentRoundTime = this.ROUND_TIME;
    this.dialogBlock = false;
    this.activeDetail = 5;
    this.dialogEnd = false;
    this.dialogStart = true;
    this.putCard = [false, false, false, false, false];
    this.startMatch();
  }

  //TODO: Incluir que el reseteo de datos lo haga StartMatch?
  endMatch() {
    this.dialogEnd = false;
    this.dialogBlock = false;
    this.dialogStart = true;
    this.pauseTimer();
    this.isPausedTimer = true;
    this.currentRound = 0;
    this.activeDetail = 5;
  }

  startTimer() {
    setInterval(() => {
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

  nextRound() {
    if (this.currentRound >= 4) {
      console.log('Implementar final de juego');
    } else {
      this.currentRoundTime = this.ROUND_TIME;
      this.currentRound++;
      this.resumeTimer();
    }
  }

  getCardWinDetails(index: number, event: MouseEvent) {
    event.preventDefault();
    this.selectedCardDetails = this.playerDeckInGame.cards[index];
  }

  async getBattleResult(
    playerCard: string,
    enemyCard: string
  ): Promise<BattleOutcome> {
    let outcome = await lastValueFrom(
      this.mockService.getMockBattleResult(
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

  //TODO: Funciones no revisadas/usadas aun
  openMenu() {
    this.trigger?.openMenu();
  }

  signup() {
    this.gameService.endGame();
  }
  dialogResult() {
    this.getEndText();
    this.dialogEnd = true;
  }
  getEndText() {
    let wins: number = 0;
    let loses: number = 0;
    for (let i = 0; i < this.rounds.length; i++) {
      if (this.rounds[i][2] === 'WIN') {
        wins++;
      } else if (this.rounds[i][2] === 'LOSE') {
        loses++;
      }
    }
    if (wins > loses) {
      this.endText = 'YOU WIN!';
    } else if (wins < loses) {
      this.endText = 'YOU LOSE!';
    } else {
      this.endText = 'DRAW!';
    }
  }
  exitGame() {
    this.pauseTimer();
    this.dialogBlock = true;
    this.dialogText = 'END';
  }

  pauseGame() {
    this.pauseTimer();
    this.dialogResume = true;
  }

  restartGame() {
    this.pauseTimer();
    this.dialogBlock = true;
    this.dialogText = 'RESTART';
  }

  changeClass(element: string): void {
    let activeCard = document.getElementById(element);
    activeCard!.classList.add('chosenCard');
  }
  activateCard(index: number) {
    if (this.activeCard[index] === true) {
      this.putCard[index] = true;
      //this.rounds[this.round] = this.playRound(index);
      this.nextRound();
    } else {
      for (let i = 0; i < this.activeCard.length; i++) {
        this.activeCard[i] = false;
      }
      this.activeCard[index] = true;
    }
  }
  changeInstructionsToDetails(index: number) {
    for (let i = 0; i < this.activeDetails.length; i++) {
      this.activeDetails[i] = false;
    }
    if (this.activeDetail === index) {
      this.activeDetail = 5;
    } else {
      this.activeDetails[index] = true;
      this.activeDetail = index;
    }
  }

  close() {
    this.dialogBlock = false;
    this.startTimer();
  }
  reloadCurrentPage() {
    window.location.reload();
  }
}
