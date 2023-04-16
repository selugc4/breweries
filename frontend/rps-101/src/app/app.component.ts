import {
  Component,
  ComponentFactoryResolver,
  Injector,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { GameService } from './services/game.service';
import { GameParameters } from './models/GameParameters';
import { DeckComponent } from './deck/deck.component';
import { GameComponent } from './game/game.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('gameContainer', { read: ViewContainerRef, static: true })
  gameContainerElement?: ViewContainerRef;

  title = 'Janken 101';

  constructor(
    private gameService: GameService,
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  ngOnInit() {
    this.gameService.StartGameEvent.subscribe((parameters) => {
      this.renderGame(parameters);
    });
    this.gameService.EndGameEvent.subscribe(() => {
      this.destroyGame();
    });
  }

  renderGame(parameters: GameParameters) {
    const factory = this.resolver.resolveComponentFactory(GameComponent); //Cambiar al componente de partida
    const componentRef = factory.create(this.injector);
    componentRef.instance.deck = parameters.deck; //Insertar aquí las dependencias del componente de partida
    componentRef.location.nativeElement.className = 'game-container';

    this.gameContainerElement!.clear();
    this.gameContainerElement!.insert(componentRef.hostView);
  }

  destroyGame(){
    this.gameContainerElement!.clear();
  }
}
