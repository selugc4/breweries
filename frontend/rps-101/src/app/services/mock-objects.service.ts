import { Injectable } from '@angular/core';

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
}
