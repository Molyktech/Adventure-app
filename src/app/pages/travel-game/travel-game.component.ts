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
import { Store } from '@ngxs/store';
import { ButtonComponent } from '../../components/button/button.component';
import {
  GetGameQuestions,
  ResetAnsweredQuestion,
  UpdateAnsweredQuestion,
} from '../../store/game/game.actions';
import { GameSelectors } from '../../store/game/game.queries';
import { IChoice, IQuestion } from '../../utils/models/questions';
import { DecisionTreeComponent } from '../decision-tree/decision-tree.component';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  currentQuestion: IQuestion = { id: '', text: '', choices: [] };
  animationState = 'hidden';
  gameEnded = false;
  endMessage = '';
  questionStartKey = '';
  answeredQuestions!: Observable<string[]>;

  ngOnInit(): void {
    this._store.dispatch(new GetGameQuestions());
    this._store
      .select(GameSelectors.getFormattedQuestions)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((formattedQuestions) => {
        this.questions = formattedQuestions;
      });
    this._store
      .select(GameSelectors.getStartQuestionId)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((startQuestionId) => {
        this.questionStartKey = startQuestionId;
      });

    this.restartAdventure();
    this.answeredQuestions = this._store.select(
      GameSelectors.getAnsweredQuestions,
    );
  }

  loadQuestion(id: number | string): void {
    this.currentQuestion = this.questions[id];
    if (this.currentQuestion) {
      this.triggerAnimation();
      if (this.currentQuestion.choices.length === 0) {
        this.gameEnded = true;

        this.endMessage = this.currentQuestion.text;
      } else {
        this.gameEnded = false;
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
      this.gameEnded = true;
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

  restartAdventure(): void {
    //clear answered questions from store
    this._store.dispatch(new ResetAnsweredQuestion());
    // add the game start question to the answered questions
    this._store.dispatch(new UpdateAnsweredQuestion(this.questionStartKey));
    this.loadQuestion(this.questionStartKey);
  }

  ngOnDestroy(): void {
    this.clickSound.pause();
  }
}
