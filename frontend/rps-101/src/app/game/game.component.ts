import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MockObjectsService } from '../services/mock-objects.service';
import { CardApiService } from 'app/services/card-api.service';
import { RandomDeckService } from '../services/random-deck.service';
import { Deck } from 'app/models/Deck';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { ViewContainerRef } from '@angular/core';
import { AppComponent } from 'app/app.component';
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
  @Input() deck?: Deck;

  constructor(
    private randomDeckService: RandomDeckService,
    private cardApiService: CardApiService,
    private appComp: AppComponent
  ) {}
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
  soundIcon: string = 'assets/audio-on.svg';
  soundActivated: boolean = true;
  rightClickCard: boolean = false;
  restartDeck: string[] = [];
  roundTime: number = 0;
  time: number = 0;
  activatedChrono: boolean = true;
  activeDetails: boolean[] = Array(5);
  activeDetail: number = 5;
  display = '00:00';
  interval: any;
  round: number = 0;
  playerDeck: string[] = [];
  enemyDeck: string[] = [];
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

  /*
  NUEVO CODIGO (INICIO)
  */

  throwCard($event: MouseEvent) {
    const elemento = $event.currentTarget as HTMLElement;
    console.log(elemento);
    elemento.classList.remove('user-card');
    elemento.classList.add('throw-card');
    const roundResultComponent = document.querySelector('.round-result');
    setTimeout(() => {
      roundResultComponent?.classList.add('show-round-result');
    }, 1000);
    setTimeout(() => {
      roundResultComponent?.classList.remove('show-round-result');
    }, 3000);
  }
  /*
  NUEVO CODIGO (FIN)
  */

  startMatch() {
    this.roundTime = 100;
    this.dialogStart = false;

    if (this.deck === undefined) {
      this.playerDeck = this.getPlayerDeck(
        this.randomDeckService.getRandomDeck().cards
      );
    } else {
      this.playerDeck = this.getPlayerDeck(this.deck.cards);
    }

    this.enemyDeck = this.getPlayerDeck(
      this.randomDeckService.getRandomDeck().cards
    );
    this.startTimer();
  }

  restartMatch() {
    this.time = 0;
    this.activatedChrono = true;
    this.display = '00:00';
    this.interval = 0;
    this.round = 0;
    this.playerDeck = [];
    this.enemyDeck = [];
    this.restartScoreboard();
    this.dialogBlock = false;
    this.activeDetail = 5;
    this.dialogEnd = false;
    this.dialogStart = true;
    this.putCard = [false, false, false, false, false];
    this.startMatch();
  }

  openMenu() {
    this.trigger?.openMenu();
  }

  disableRightClick($event: MouseEvent) {
    $event.preventDefault();
  }
  startTimer() {
    this.dialogResume = false;
    this.activatedChrono = true;

    this.interval = setInterval(() => {
      if (this.time === 0) {
        this.time++;
      } else {
        this.time++;
      }
      this.roundTime = this.roundTime - 100 / 60;
      if (this.roundTime <= 0) {
        this.rounds[this.round] = this.playRound(
          Math.floor(Math.random() * (5 - this.round))
        );
        this.nextRound();
      }
      this.display = this.transform(this.time);
    }, 1000);
  }

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      String(minutes).padStart(2, '0') +
      ':' +
      String(value - minutes * 60).padStart(2, '0')
    );
  }
  pauseTimer() {
    this.activatedChrono = false;
    clearInterval(this.interval);
  }

  enableOrDisableAudio() {
    this.soundActivated = !this.soundActivated;

    if (this.soundActivated) {
      this.soundIcon = 'assets/audio-on.svg';
    } else {
      this.soundIcon = 'assets/audio-off.svg';
    }
  }
  nextRound() {
    clearInterval(this.interval);
    if (this.round >= 4) {
      this.dialogResult();
    } else {
      this.roundTime = 100;
      this.round++;
      this.startTimer();
    }
  }

  endMatch() {
    this.dialogEnd = false;
    this.dialogBlock = false;
    this.dialogStart = true;
    this.pauseTimer();
    this.roundTime = 100;
    this.time = 0;
    this.activatedChrono = false;
    this.display = '00:00';
    this.interval = 0;
    this.round = 0;
    this.restartScoreboard();
    this.playerDeck = [];
    this.enemyDeck = [];
    this.activeDetail = 5;
  }

  signup() {
    this.appComp.destroyGame();
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

  numSequence(): Array<number> {
    return Array(5);
  }
  getRandom101(index: number): number {
    return Math.floor(Math.random() * (101 - index));
  }
  getCard(i: number, cards: string[]): string {
    let card: string = cards[i];
    return card;
  }
  getDeck(): Array<string> {
    let mock: MockObjectsService = new MockObjectsService();
    let cards: string[] = mock.getMockObjects();
    let deck: string[] = [];
    for (let i = 0; i < 5; i++) {
      let random = this.getRandom101(i);
      deck[i] = this.getCard(random, cards).toLowerCase();
      cards.splice(random, 1);
    }
    return deck;
  }
  changeClass(element: string): void {
    let activeCard = document.getElementById(element);
    activeCard!.classList.add('chosenCard');
  }
  activateCard(index: number) {
    if (this.activeCard[index] === true) {
      this.putCard[index] = true;
      this.rounds[this.round] = this.playRound(index);
      this.nextRound();
    } else {
      for (let i = 0; i < this.activeCard.length; i++) {
        this.activeCard[i] = false;
      }
      this.activeCard[index] = true;
    }
  }
  changeInstructionstoDetails(index: number) {
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

  playRound(index: number): string[] {
    //syncDelay(2000);
    var message = '';
    var enemyChosenIndex = Math.floor(Math.random() * (5 - this.round));
    var chosenCard = this.playerDeck[index];
    var enemyChosenCard = this.enemyDeck[enemyChosenIndex];

    var played: string[] = this.apiCall(chosenCard, enemyChosenCard);

    this.removeUserCard(index);

    this.enemyDeck.splice(enemyChosenIndex, 1);

    if (chosenCard === played[0]) {
      message = 'WIN';
    } else if (enemyChosenCard === played[0]) {
      message = 'LOSE';
    } else {
      message = 'DRAW';
    }

    return Array(chosenCard, enemyChosenCard, message);
  }

  removeUserCard(index: number) {
    this.playerDeck.splice(index, 1);

    for (let i = 0; i < this.activeCard.length; i++) {
      this.activeCard[i] = false;
      this.putCard[i] = false;
    }
  }

  restartScoreboard() {
    this.rounds = [];
    this.rounds.length = 5;
    for (var i: number = 0; i < 5; i++) {
      this.rounds[i] = [];
      for (var j: number = 0; j < 3; j++) {
        this.rounds[i][j] = '';
      }
    }
  }

  close() {
    this.dialogBlock = false;
    this.startTimer();
  }
  reloadCurrentPage() {
    window.location.reload();
  }

  apiCall(chosenCard: string, enemyChosenCard: string): string[] {
    var played = this.cardApiService.getMatchResult(
      chosenCard,
      enemyChosenCard
    );
    var arrayPlay: string[] = [];

    played.subscribe((play) => {
      arrayPlay[0] = play.winner.toLowerCase();
      arrayPlay[1] = play.outcome.toLowerCase();
      arrayPlay[2] = play.loser.toLowerCase();
    });

    return arrayPlay;
  }
  getPlayerDeck(cards: string[]): string[] {
    var aux = [];
    for (var i = 0; i < cards.length; i++) {
      aux[i] = cards[i].toLowerCase();
    }
    return aux;
  }
}

export enum GameMode {
  Hidden,
  Rivals,
  Exposed,
}

function syncDelay(milliseconds: number) {
  var start = new Date().getTime();
  var end = 0;
  while (end - start < milliseconds) {
    end = new Date().getTime();
  }
}
