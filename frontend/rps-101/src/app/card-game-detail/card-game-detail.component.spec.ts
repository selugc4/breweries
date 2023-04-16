import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardGameDetailComponent } from './card-game-detail.component';

describe('CardDetailComponent', () => {
  let component: CardGameDetailComponent;
  let fixture: ComponentFixture<CardGameDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardGameDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardGameDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
