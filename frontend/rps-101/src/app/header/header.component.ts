import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { BreweriesComponent } from 'app/breweries/breweries.component';
import { TopBreweriesComponent } from 'app/top-breweries/top-breweries.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    ubication: boolean = false;
    @Input() placeholder: string = 'Search...';
    @Input() array!: [];
    @Input() control = new FormControl('');
    @Input() brewery!: BreweriesComponent;
    @Input() topbrewery!: TopBreweriesComponent;
    @Input() name: string = "";
    state: boolean = false;
    hideList: boolean = false;
    constructor(private router: Router){
        router.events.subscribe((val) => {
            if (val instanceof NavigationEnd){
                if(val.url !== '/top'){
                    this.hideList = false;
                }else{
                    this.hideList = true;
                }
            }
        });
    }
    ngOnInit() {
        this.brewery!.breweryDetail;
        let url = this.router.url.split("/");
        if(url[url.length-1] == "top"){
            this.state = true;
        }
        else{
            this.state = false;
        }
    }
    search(){
        if(this.state == true){
            this.topbrewery.search(this.name);
        }
        else{
            this.brewery.search(this.name);
        }
    }
    restart(){
        this.brewery.restart();
    }
}

