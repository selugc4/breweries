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
  myControl = new FormControl('');
  winningOutcomes!: WinningOutcome[];
  cardName!: string;
  versus?: WinningOutcome;
  filteredCards!: Observable<WinningOutcome[]>;
  regularDistribution = 100 / 3 + '%';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private cardApi: CardApiService,
  ) { }

  ngOnInit(): void {
    this.filteredCards = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
    this.cardName = String(this.route.snapshot.paramMap.get('name'));
    this.cardApi.getCardOutcomes(this.cardName).subscribe((response) => {
      this.winningOutcomes = response.winningOutcomes;
    });
  }

  private _filter(value: string): WinningOutcome[] {
    const filterValue = value.toLowerCase();

    return this.winningOutcomes.filter((option) =>
      option.losingCard.toLowerCase().includes(filterValue)
    );
  }

  filterCards(): WinningOutcome[] {
    return this.winningOutcomes.filter((option) =>
      option.losingCard.toLowerCase().includes(this.myControl.value?.toLocaleLowerCase()!)
    );
  }

  cutString(value: string): string {
    if (value.length > 12) {
      return value.slice(0, 12) + '...';
    }
    return value;
  }
}
