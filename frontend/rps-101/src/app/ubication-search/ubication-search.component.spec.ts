import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicationSearchComponent } from './ubication-search.component';

describe('UbicationSearchComponent', () => {
  let component: UbicationSearchComponent;
  let fixture: ComponentFixture<UbicationSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UbicationSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UbicationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
