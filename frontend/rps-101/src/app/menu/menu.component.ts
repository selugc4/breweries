import { Component, Input } from '@angular/core';
import { BreweriesComponent } from 'app/breweries/breweries.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
    @Input() brewery!: BreweriesComponent;
    restart(){
        this.brewery.restart();
    }
}
