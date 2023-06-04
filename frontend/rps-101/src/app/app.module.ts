import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { HeaderComponent } from './header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MenuComponent } from './menu/menu.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RemoteScrapperService } from './services/remote-scrapper.service';
import { ScrapperService } from './services/scrapper.service';
import { UbicationSearchComponent } from './ubication-search/ubication-search.component';
import { BreweriesComponent } from './breweries/breweries.component';
import { BreweryComponent } from './brewery/brewery.component';
import { RemoteBreweriesApiService } from './services/remote-breweries-api.service';
import { BreweryDetailComponent } from './brewery-detail/brewery-detail.component';
import { BreweriesApiService } from './services/local-breweries-api.service';
import { TopBreweriesComponent } from './top-breweries/top-breweries.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        MenuComponent,
        BreweriesComponent,
        BreweryComponent,
        BreweryDetailComponent,
        UbicationSearchComponent,
        TopBreweriesComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatTooltipModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatGridListModule,
        MatSidenavModule,
        HttpClientModule,
        MatListModule,
        MatDialogModule,
        MatMenuModule,
        MatSliderModule,
        MatProgressSpinnerModule,
        DragDropModule,
    ],
    //Select between Mock and Remote APIs
    providers: [
        { provide: ScrapperService, useClass: RemoteScrapperService },
        { provide: RemoteBreweriesApiService, useClass: RemoteBreweriesApiService },
        { provide: BreweriesApiService, useClass: BreweriesApiService}
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
