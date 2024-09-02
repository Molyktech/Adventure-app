import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DecisionTreeComponent } from './decision-tree.component';
import {
  FORMATTED_QUESTIONS,
  MOCK_GAME_STATE,
  TEST_MAPPED_MOCKED_QUESTIONS,
  TEST_MOCK_QUESTIONS,
} from '../../mocks/game.mock';
import { IQuestion } from '../../utils/models/questions';

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
  it('should build the question tree on init', () => {
    const mockQuestions: Record<string, IQuestion> = TEST_MOCK_QUESTIONS;
    component.questions = mockQuestions;
    component.questionStartKey = 'start';
    component.ngOnInit();

    expect(component.nodes).toEqual(TEST_MAPPED_MOCKED_QUESTIONS);
  });

  it('should build the choices tree correctly', () => {
    const mockQuestions: Record<string, IQuestion> = TEST_MOCK_QUESTIONS;

    const result = component.buildChoicesTree(
      mockQuestions,
      mockQuestions['start'].choices,
      'start',
    );

    expect(result).toEqual(TEST_MAPPED_MOCKED_QUESTIONS.choices);
  });

  it('should return true if nodeId is in the path', () => {
    component.path = ['start', 'start-next1'];
    expect(component.isSelected('start-next1')).toBe(true);
  });

  it('should return false if nodeId is not in the path', () => {
    component.path = ['start', 'start-next1'];

    expect(component.isSelected('start-next2')).toBe(false);
  });

  it('should return false if path is null or empty', () => {
    component.path = null;

    expect(component.isSelected('start-next1')).toBe(false);

    component.path = [];

    expect(component.isSelected('start-next1')).toBe(false);
  });
});
