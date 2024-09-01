import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { APPLICATION_ROUTE_PATH } from '../../constants/routes';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent, RouterModule, CommonModule, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  adventurePath = APPLICATION_ROUTE_PATH.ADVENTURE;
  introSound: HTMLAudioElement = new Audio('assets/sounds/intro.wav');
  isMuted = false;
  ngOnInit(): void {
    // doing this to allow user interact with the page before the sound starts playing just to follow Chrome's autoplay policies. Note that it would still play regardless of the user's interaction.
    this.toggleMute();
  }

  ngOnDestroy(): void {
    this.stopIntroSound();
  }

  private playIntroSound(): void {
    if (!this.introSound) {
      this.introSound = new Audio('assets/sounds/intro.wav');
    }
    this.introSound.loop = true;
    this.introSound.addEventListener('ended', () => {
      this.introSound.play();
    });
    this.introSound.load(); // Cache the sound
    this.introSound.play();
  }

  private stopIntroSound(): void {
    if (this.introSound) {
      this.introSound.pause();
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      this.introSound.removeEventListener('ended', () => {});
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.introSound.muted = true;
    } else {
      this.introSound.muted = false;
      this.playIntroSound();
    }
  }
}
