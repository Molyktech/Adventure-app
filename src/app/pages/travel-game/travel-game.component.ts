import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ButtonComponent } from '../../components/button/button.component';
import {
  GetGameQuestions,
  ResetAnsweredQuestion,
  SetCurrentQuestion,
  SetGameStatus,
  UpdateAnsweredQuestion,
} from '../../store/game/game.actions';
import { GameSelectors } from '../../store/game/game.queries';
import { IChoice, IQuestion } from '../../utils/models/questions';
import { DecisionTreeComponent } from '../decision-tree/decision-tree.component';
import { isEmptyObject } from '../../utils/helpers';

@Component({
  selector: 'app-travel-game',
  standalone: true,
  imports: [CommonModule, ButtonComponent, DecisionTreeComponent],
  templateUrl: './travel-game.component.html',
  styleUrl: './travel-game.component.scss',
  animations: [
    trigger('slideIn', [
      state(
        'hidden',
        style({
          opacity: 0,
          transform: 'translateY(100%)',
        }),
      ),
      state(
        'visible',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        }),
      ),
      transition('hidden => visible', [animate('0.5s ease-out')]),
    ]),
  ],
})
export class TravelGameComponent implements OnInit, OnDestroy {
  private _store = inject(Store);
  private _destroyRef = inject(DestroyRef);
  questions!: Record<string, IQuestion>;
  clickSound = new Audio('assets/sounds/click.wav');
  currentQuestion!: IQuestion;
  animationState = 'hidden';
  gameEnded$: Observable<boolean> = this._store.select(
    GameSelectors.getGameStatus,
  );
  gameEnded = false;
  endMessage = '';
  questionStartKey = '';
  answeredQuestions$!: Observable<string[]>;

  ngOnInit(): void {
    this._store.dispatch(new GetGameQuestions());
    this._store
      .select(GameSelectors.getFormattedQuestions)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (formattedQuestions) => (this.questions = formattedQuestions),
      });
    this._store
      .select(GameSelectors.getStartQuestionId)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (startQuestionId) => {
          if (startQuestionId) {
            this.questionStartKey = startQuestionId;
          }
        },
      });
    this._store
      .select(GameSelectors.getCurrentQuestion)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (currentQuestion) => {
          if (currentQuestion) {
            this.currentQuestion = currentQuestion;
          }
        },
      });

    this.startAdventure();
    this.answeredQuestions$ = this._store.select(
      GameSelectors.getAnsweredQuestions,
    );
  }

  loadQuestion(id: number | string): void {
    this.currentQuestion = this.questions[id];

    if (this.currentQuestion) {
      this._store.dispatch(new SetCurrentQuestion(this.currentQuestion));
      this.triggerAnimation();
      if (this.currentQuestion.choices.length === 0) {
        this._store.dispatch(new SetGameStatus(true));

        this.endMessage = this.currentQuestion.text;
      } else {
        this._store.dispatch(new SetGameStatus(false));
      }
    }
  }

  selectChoice(choice: IChoice): void {
    this.clickSound.play();

    this._store.dispatch(
      new UpdateAnsweredQuestion(
        `${this.currentQuestion.id}-${choice.nextQuestionId}`,
      ),
    );

    if (choice.nextQuestionId) {
      this.loadQuestion(choice.nextQuestionId);
    } else {
      // No next question, end of game
      this._store.dispatch(new SetGameStatus(true));

      this.endMessage = 'Thank you for playing!';
    }
  }

  triggerAnimation(): void {
    this.animationState = 'hidden';
    // Trigger change detection cycle for animation
    setTimeout(() => {
      this.animationState = 'visible';
    }, 100); // Slight delay to ensure animation triggers
  }

  startAdventure(): void {
    const storedQuestionId = isEmptyObject(this.currentQuestion)
      ? this.questionStartKey
      : this.currentQuestion.id;

    this.loadQuestion(storedQuestionId);
  }

  updateAndResetAnsweredQuestions() {
    //clear answered questions from store
    this._store.dispatch(new ResetAnsweredQuestion());
    // add the game start question to the answered questions
    this._store.dispatch(new UpdateAnsweredQuestion(this.questionStartKey));
    // get the currentQuestion and check if it has a value before using it
  }
  restartAdventure(): void {
    this.updateAndResetAnsweredQuestions();
    this._store.dispatch(new SetCurrentQuestion(null));
    this._store.dispatch(new SetGameStatus(false));

    this.loadQuestion(this.questionStartKey);
  }

  ngOnDestroy(): void {
    this.clickSound.pause();
    this.restartAdventure();
  }
}
