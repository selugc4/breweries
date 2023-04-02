import { Injectable } from '@angular/core';
import { Deck } from '../models/Deck';

@Injectable({
  providedIn: 'root'
})
export class MockObjectsService {

  constructor() { }

  getMockObjects() {
    return ["Air", "Airplane", "Alien", "Axe", "Baby", "Beer", "Bicycle", "Bird", "Blood", "Book", "Bowl",
      "Brain", "Butter", "Cage", "Camera", "Car", "Castle", "Cat", "Chain", "Chainsaw", "Church", "Cloud",
      "Cockroach", "Community", "Computer", "Cross", "Cup", "Death", "Devil", "Diamond", "Dragon", "Duck",
      "Dynamite", "Electricity", "Fence", "Film", "Fire", "Fish", "Gold", "Grass", "Guitar", "Gun", "Heart",
      "Helicopter", "Home", "King", "Laser", "Law", "Lightning", "Man", "Math", "Medusa", "Money", "Monkey",
      "Moon", "Mountain", "Noise", "Nuke", "Paper", "Peace", "Pit", "Planet", "Platimum", "Poison", "Police",
      "Porcupine", "Power", "Prayer", "Prince", "Princess", "Queen", "Quicksand", "Rain", "Rainbow", "Robot",
      "Rock", "Satan", "School", "Scissors", "Sky", "Snake", "Spider", "Sponge", "Sun", "Sword", "T.V.", "Tank",
      "Toilet", "Tornado", "Train", "Tree", "Turnip", "U.F.O.", "Vampire", "Video Game", "Vulture", "Wall",
      "Water", "Whip", "Wolf", "Woman"];
  }

  getMockDecks(): Deck[] {
    return [
      { id: 12, name: 'Dr. Nice', cards: [ "Video game", "Airplane", "Alien", "Axe", "Baby"] },
      { id: 13, name: 'Bombasto', cards: ["Laser", "Law", "Video game", "Man", "Math"] },
      { id: 14, name: 'Celeritas', cards: ["Cup", "Death", "Devil", "Diamond", "Dragon"] },
      { id: 15, name: 'Magneta', cards: ["Laser", "Law", "Lightning", "Man", "Math"] },
      { id: 18, name: 'Dr. IQ', cards: ["Satan", "School", "Scissors", "Sky", "Snake"] },
      { id: 19, name: 'Magma', cards: ["Sponge", "Sun", "Sword", "T.V.", "Tank"] },
      { id: 20, name: 'Tornado', cards: ["Wall","Water", "Whip", "Wolf", "Woman"] }
    ];
  }
}