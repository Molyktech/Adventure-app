import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { GameService } from '../../core/services/game.service';
import { IChoice, IQuestion } from '../../utils/models/questions';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { DecisionTreeComponent } from '../decision-tree/decision-tree.component';

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
export class TravelGameComponent implements OnInit {
  questions!: Record<string, IQuestion>;
  // clickSound = new Audio('assets/sounds/click.mp3');
  // successSound = new Audio('assets/sounds/success.mp3');
  // failSound = new Audio('assets/sounds/fail.mp3');
  currentQuestion: IQuestion = { id: '', text: '', choices: [] };
  animationState = 'hidden';
  gameEnded = false;
  endMessage = '';
  path: string[] = []; // To track user's choices
  questionStartKey = 'start';

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.loadQuestions().subscribe((questions) => {
      this.questions = questions.reduce(
        (acc, question) => ({
          ...acc,
          [question.id]: question,
        }),
        {} as Record<string, IQuestion>,
      );
    });
    this.restartAdventure();
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
    // this.clickSound.play();
    // this.path.push(choice.label);
    this.path.push(
      `${this.currentQuestion.id}-${choice.nextQuestionId}` as string,
    );

    if (choice.nextQuestionId) {
      this.loadQuestion(choice.nextQuestionId);
    } else {
      // No next question, end of game
      this.gameEnded = true;
      this.endMessage = 'Thank you for playing!';
      // this.successSound.play();
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
    this.path = [];
    this.path.push(this.questionStartKey);
    this.loadQuestion(this.questionStartKey);
  }
}
