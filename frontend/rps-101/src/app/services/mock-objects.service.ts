import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockObjectsService {

  constructor() { }

  getMockObjects() {
    return ["Air", "Airplane", "Alien", "Axe", "Baby", "Beer", "Bicycle", "Bird", "Blood"];
  }
}
