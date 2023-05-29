import { Component} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Input } from '@angular/core';

@Component({
  selector: 'app-ubication-search',
  templateUrl: './ubication-search.component.html',
  styleUrls: ['./ubication-search.component.scss']
})
export class UbicationSearchComponent {
  @Input() array!: [];
  @Input() control = new FormControl('');
}
