import { Injectable } from '@angular/core';
import { Deck } from '../models/Deck';
import { MockObjectsService } from '../services/mock-objects.service';

@Injectable({
  providedIn: 'root'
})
export class RandomDeckService {

  constructor(private mock: MockObjectsService) { }

  getRandomDeck(): Deck {
    let cards: string[] = this.mock.getMockObjects();
    let selectedCards: string[] = [];

    for (let i = 0; i < 5; i++) {
      const random = this.getRandom101(i);
      selectedCards[i] = cards[random];
      cards.splice(random, 1);
    }
    
    return { id: -1, name: "Random", cards: selectedCards };
  }

  private getRandom101(index: number): number {
    return Math.floor(Math.random() * (101 - index));
  }
}
