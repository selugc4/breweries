import { Component } from '@angular/core';
import { GameService } from '../services/game.service';
import { Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  ubication: boolean = false;
  @Input() placeholder: string = 'Search...';
  @Input() array!: [];
  @Input() control = new FormControl('');
  constructor(private gameService: GameService) {}

  register: boolean = true;

  destroyGame() {
    this.gameService.endGame(true);
  }
}
