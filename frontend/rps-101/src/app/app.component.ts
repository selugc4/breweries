import { Component } from '@angular/core';
import { MockObjectsService } from './services/mock-objects.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Janken 101';

  objetos: string[] = [];

  constructor(private mock: MockObjectsService) { }

  ngOnInit() {
    console.log(this.mock.getMockObjects());
    this.objetos = this.mock.getMockObjects();
  }
}
