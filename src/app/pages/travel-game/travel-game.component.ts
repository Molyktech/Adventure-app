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
  Signal,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ButtonComponent } from '../../components/button/button.component';
import { DecisionTreeComponent } from '../../components/decision-tree/decision-tree.component';
import { CLICK_SOUND_KEY } from '../../constants/routes';
import { AudioService } from '../../core/services/audio.service';
import {
  GetGameQuestions,
  ResetAnsweredQuestion,
  SetCurrentQuestion,
  SetGameStatus,
  UpdateAnsweredQuestion,
} from '../../store/game/game.actions';
import { GameSelectors } from '../../store/game/game.queries';
import { isEmptyObject } from '../../utils/helpers';
import { IChoice, IQuestion } from '../../utils/models/questions';

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
  private _audioService = inject(AudioService);
  private readonly CLICK_SOUND_KEY = CLICK_SOUND_KEY;
  // Note to self: using signals for variables that change the state of the component and can be described as conditions
  questions!: Record<string, IQuestion>;
  audioUrl = 'assets/sounds/click.wav';
  clickSound = new Audio('assets/sounds/click.wav');
  currentQuestion!: IQuestion;
  animationState = signal<string>('hidden');
  endMessage = signal<string>('');
  questionStartKey: Signal<string> = this._store.selectSignal(
    GameSelectors.getStartQuestionId,
  );
  gameEnded: Signal<boolean> = this._store.selectSignal(
    GameSelectors.getGameStatus,
  );
  answeredQuestions$: Observable<string[]> = this._store.select(
    GameSelectors.getAnsweredQuestions,
  );

  ngOnInit(): void {
    this._store.dispatch(new GetGameQuestions());
    this._store
      .select(GameSelectors.getFormattedQuestions)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (formattedQuestions) => (this.questions = formattedQuestions),
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
    this._audioService.initAudio(this.CLICK_SOUND_KEY, this.audioUrl, false);
  }

  loadQuestion(id: number | string): void {
    this.currentQuestion = this.questions[id];
    if (this.currentQuestion) {
      this._store.dispatch(new SetCurrentQuestion(this.currentQuestion));
      this.triggerAnimation();
      if (this.currentQuestion.choices.length === 0) {
        this._store.dispatch(new SetGameStatus(true));

        this.endMessage.set(this.currentQuestion.text);
      } else {
        this._store.dispatch(new SetGameStatus(false));
      }
    }
  }

  selectChoice(choice: IChoice): void {
    this._audioService.playAudio(this.CLICK_SOUND_KEY);
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

      this.endMessage.set('Thank you for playing!');
    }
  }

  triggerAnimation(): void {
    this.animationState.set('hidden');
    // Trigger change detection cycle for animation
    setTimeout(() => {
      this.animationState.set('visible');
    }, 100); // Slight delay to ensure animation triggers
  }

  startAdventure(): void {
    const storedQuestionId = isEmptyObject(this.currentQuestion)
      ? this.questionStartKey()
      : this.currentQuestion.id;

    this.loadQuestion(storedQuestionId);
  }

  updateAndResetAnsweredQuestions() {
    // Clear answered questions from store
    this._store.dispatch(new ResetAnsweredQuestion());
    // Add the game start question to the answered questions
    this._store.dispatch(new UpdateAnsweredQuestion(this.questionStartKey()));
    // Det the currentQuestion and check if it has a value before using it
  }
  restartAdventure(): void {
    this.updateAndResetAnsweredQuestions();
    this._store.dispatch(new SetCurrentQuestion(null));
    this._store.dispatch(new SetGameStatus(false));

    this.loadQuestion(this.questionStartKey());
  }

  ngOnDestroy(): void {
    this._audioService.stopAudio(this.CLICK_SOUND_KEY);
    this.restartAdventure();
  }
}
