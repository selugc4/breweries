import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreboardRoundComponent } from './scoreboard-round.component';

describe('ScoreboardRoundComponent', () => {
  let component: ScoreboardRoundComponent;
  let fixture: ComponentFixture<ScoreboardRoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreboardRoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreboardRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
