import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardApiService } from '../services/card-api.service';
import { WinningOutcome } from '../models/CardOutcomes';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss'],
})
export class CardDetailComponent {
  autocompleteControl = new FormControl('');
  winningOutcomes!: WinningOutcome[];
  cardName!: string;
  versus?: WinningOutcome;
  filteredCards!: WinningOutcome[];
  filterProperty: string = 'losingCard';

  constructor(private route: ActivatedRoute, private cardApi: CardApiService) {}

  ngOnInit(): void {
    this.cardName = String(this.route.snapshot.paramMap.get('name'));
    this.cardApi.getCardOutcomes(this.cardName).subscribe((response) => {
      this.winningOutcomes = response.winningOutcomes;
    });
  }

  getFiltered(filtered: WinningOutcome[]) {
    this.filteredCards = filtered;
  }

  cutString(value: string): string {
    if (value.length > 12) {
      return value.slice(0, 12) + '...';
    }
    return value;
  }
}
