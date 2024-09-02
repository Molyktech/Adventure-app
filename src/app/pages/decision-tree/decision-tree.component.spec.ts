import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionTreeComponent } from './decision-tree.component';
import { FORMATTED_QUESTIONS, MOCK_GAME_STATE } from '../../mocks/game.mock';

describe('DecisionTreeComponent', () => {
  let component: DecisionTreeComponent;
  let fixture: ComponentFixture<DecisionTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecisionTreeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DecisionTreeComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('questions', FORMATTED_QUESTIONS);
    fixture.componentRef.setInput('path', MOCK_GAME_STATE.answeredQuestions);
    fixture.componentRef.setInput(
      'questionStartKey',
      MOCK_GAME_STATE.startQuestionId,
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
