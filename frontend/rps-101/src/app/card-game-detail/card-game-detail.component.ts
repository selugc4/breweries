import { Component, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CardApiService } from 'app/services/card-api.service';
import { WinningOutcome } from 'app/models/CardOutcomes';

@Component({
  selector: 'app-card-game-detail',
  templateUrl: './card-game-detail.component.html',
  styleUrls: ['./card-game-detail.component.scss'],
})
export class CardGameDetailComponent {
  @Input() name: string = '';

  winningOutcomes!: WinningOutcome[];

  constructor(private cardApiService: CardApiService) {}

  ngOnInit() {
    this.cardApiService.getCardOutcomes(this.name).subscribe((result) => {
      this.winningOutcomes = result.winningOutcomes;
    });
  }
}
