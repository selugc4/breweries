import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBreweriesComponent } from './top-breweries.component';

describe('TopBreweriesComponent', () => {
  let component: TopBreweriesComponent;
  let fixture: ComponentFixture<TopBreweriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopBreweriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopBreweriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
