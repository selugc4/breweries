import { Component, Input} from '@angular/core';
import { CardComponent } from '../card/card.component';
import { MockObjectsService } from 'app/services/mock-objects.service';
import { WinningOutcome } from 'app/models/CardOutcomes';

@Component({
  selector: 'app-card-game-detail',
  templateUrl: './card-game-detail.component.html',
  styleUrls: ['./card-game-detail.component.scss']
})
export class CardGameDetailComponent {
  @Input() name: string = "";

  winningOutcomes!: WinningOutcome[]

  constructor(private mock: MockObjectsService){}

  ngOnInit() {
    this.winningOutcomes = this.mock.getMockWinningOutcomes(this.name);
  }

}
