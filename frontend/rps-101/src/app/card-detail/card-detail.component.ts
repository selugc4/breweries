import { Component, OnInit } from '@angular/core';
import { MockObjectsService } from '../services/mock-objects.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { CardApiService } from '../services/card-api.service';
import { WinningOutcome } from '../models/CardOutcomes';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss'],
})
export class CardDetailComponent implements OnInit {
  autocompleteControl = new FormControl('');
  winningOutcomes!: WinningOutcome[];
  cardName!: string;
  versus?: WinningOutcome;
  filteredCards!: WinningOutcome[];
  filterProperty: string = 'losingCard';
  regularDistribution = 100 / 3 + '%';

  constructor(
    private mock: MockObjectsService,
    private route: ActivatedRoute,
    private cardApi: CardApiService
  ) {}

  ngOnInit(): void {
    this.cardName = String(this.route.snapshot.paramMap.get('name'));
    this.winningOutcomes = [];
    //TODO: Autocomplete component does not work properly when the input comes from asyncronous calls
    // this.cardApi.getCardOutcomes(this.cardName).subscribe((response) => {
    //   this.winningOutcomes = response.winningOutcomes;
    // });
    this.winningOutcomes = this.mock.getMockWinningOutcomes(this.cardName);
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
