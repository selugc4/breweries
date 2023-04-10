import { Deck } from '../models/Deck';
import { GameMode } from '../models/GameMode';

export interface GameParameters {
  gamemode: GameMode;
  deck: Deck;
}
