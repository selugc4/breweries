import { Component } from '@angular/core';
import { MockObjectsService } from './services/mock-objects.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rps-101';

  objeto: string = ""

  constructor(private mock: MockObjectsService) { }

  ngOnInit() {
    console.log(this.mock.getMockObjects());
    console.log(this.getComponentWidth());
    this.objeto = this.mock.getMockObjects()[0].toLowerCase();
    this.objeto = "video game";
  }

  private getComponentWidth() {
    return document.getElementById('rocket');
  }
}
