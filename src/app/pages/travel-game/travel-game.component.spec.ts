import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelGameComponent } from './travel-game.component';

describe('TravelGameComponent', () => {
  let component: TravelGameComponent;
  let fixture: ComponentFixture<TravelGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelGameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TravelGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
