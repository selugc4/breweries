import { Component } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private gameService: GameService) {}

  register: boolean = true;

  destroyGame() {
    this.gameService.endGame();
  }
}
