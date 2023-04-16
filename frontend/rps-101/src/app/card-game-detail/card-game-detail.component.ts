import { Component, Input} from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-card-game-detail',
  templateUrl: './card-game-detail.component.html',
  styleUrls: ['./card-game-detail.component.scss']
})
export class CardGameDetailComponent {
  @Input() name: string = "";
}
