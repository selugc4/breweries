import {
    Component,
    ViewChild,
} from '@angular/core';
import { BreweriesComponent } from './breweries/breweries.component';
import { TopBreweriesComponent } from './top-breweries/top-breweries.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    @ViewChild(BreweriesComponent) breweries! : BreweriesComponent;
    @ViewChild(TopBreweriesComponent) topBreweries! : TopBreweriesComponent;
    state: boolean = false;
    title = 'Breweries';
    constructor(private router: Router){
    }
    ngOnInit() {
        let url = this.router.url.split("/");
        if(url[url.length-1] == "top"){
            this.state = true;
        }
        else{
            this.state = false;
        }
    }
}
