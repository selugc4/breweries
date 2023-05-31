import { Component, Input } from '@angular/core';
import { Brewery } from 'app/models/Brewery';

@Component({
  selector: 'app-brewery',
  templateUrl: './brewery.component.html',
  styleUrls: ['./brewery.component.scss']
})
export class BreweryComponent {
    @Input()brewery!: Brewery;
}
