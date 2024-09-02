import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { APPLICATION_ROUTE_PATH } from '../../constants/routes';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AudioService } from '../../core/services/audio.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent, RouterModule, CommonModule, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  private _audioService = inject(AudioService);
  adventurePath = APPLICATION_ROUTE_PATH.ADVENTURE;
  introSound: HTMLAudioElement = new Audio('assets/sounds/intro.wav');
  private readonly INTRO_SOUND_KEY = 'introSound';
  isMuted = signal<boolean>(true);

  ngOnInit(): void {
    this._audioService.initAudio(
      this.INTRO_SOUND_KEY,
      'assets/sounds/intro.wav',
      true,
    );
  }

  toggleMute(): void {
    const newMuteState = !this.isMuted();
    this.isMuted.set(newMuteState);
    this._audioService.setMute(this.INTRO_SOUND_KEY, newMuteState);
    if (newMuteState) {
      this.stopIntroSound();
    } else {
      this.startIntroSound();
    }
  }

  startIntroSound(): void {
    this._audioService.playAudio(this.INTRO_SOUND_KEY);
  }

  stopIntroSound(): void {
    this._audioService.stopAudio(this.INTRO_SOUND_KEY);
  }

  ngOnDestroy(): void {
    this._audioService.destroyAudio(this.INTRO_SOUND_KEY);
  }
}
