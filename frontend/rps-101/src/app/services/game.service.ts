import { Injectable, EventEmitter } from '@angular/core';
import { Deck } from '../models/Deck';
import { GameMode } from '../models/GameMode';
import { GameParameters } from '../models/GameParameters';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public StartGameEvent = new EventEmitter<GameParameters>();
  public EndGameEvent = new EventEmitter(); //Parámetros de fin de partida

  constructor() { }

  public startGame(gamemode: GameMode, deck: Deck){
    const parameters: GameParameters = {gamemode: gamemode, deck: deck};
    this.StartGameEvent.emit(parameters);
  }

  public endGame(){
    this.EndGameEvent.emit();
  }
}

