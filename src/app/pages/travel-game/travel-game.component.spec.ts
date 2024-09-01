import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelGameComponent } from './travel-game.component';
import { Store } from '@ngxs/store';
import { MOCK_GAME_STATE } from '../../mocks/game.mock';

describe('TravelGameComponent', () => {
  let component: TravelGameComponent;
  let fixture: ComponentFixture<TravelGameComponent>;
  let store: Store;

  beforeEach(async () => {
    const gameStoreSpy = jasmine.createSpyObj('Store', ['dispatch']);
    await TestBed.configureTestingModule({
      imports: [TravelGameComponent],
      providers: [{ provide: Store, useValue: gameStoreSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(TravelGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
    store.reset({
      ...store.snapshot(),
      game: MOCK_GAME_STATE,
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
