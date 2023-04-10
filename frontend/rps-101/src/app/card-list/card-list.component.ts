import { Component, OnInit } from '@angular/core';
import { MockObjectsService } from '../services/mock-objects.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  myControl = new FormControl('');
  cards!: string[];
  filteredCards!: Observable<string[]>;
  regularDistribution = 100 / 3 + '%';

  constructor(
    private mockObjectsService: MockObjectsService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.filteredCards = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
    this.cards = this.mockObjectsService.getMockObjects();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.cards.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  filterCards(): string[] {
    return this.cards.filter((name) =>
      name.toLowerCase().includes(this.myControl.value?.toLocaleLowerCase()!)
    );
  }

  cutString(value: string): string {
    if (value.length > 12) {
      return value.slice(0, 12) + '...';
    }
    return value;
  }
}
