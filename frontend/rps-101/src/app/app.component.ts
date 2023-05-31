import {
    Component,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { BreweriesComponent } from './breweries/breweries.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    @ViewChild(BreweriesComponent) brewery! : BreweriesComponent;
    gameContainerElement?: ViewContainerRef;
    title = 'Breweries';
}
