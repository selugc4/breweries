import { NgModule, ViewChild } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreweryDetailComponent } from './brewery-detail/brewery-detail.component';
import { TopBreweriesComponent } from './top-breweries/top-breweries.component';

const routes: Routes = [
  { path: 'breweries', redirectTo: '', pathMatch: 'full'},
  { path: 'brewery/:id', component: BreweryDetailComponent},
  { path: 'top', component: TopBreweriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
