import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, RouterLink } from '@angular/router';
import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';
import { MockAudioService } from '../../core/services/audio.service.mock';
import { AudioService } from '../../core/services/audio.service';
import { INTRO_SOUND_KEY } from '../../constants/routes';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let audioService: MockAudioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideRouter([]),
        { provide: AudioService, useClass: MockAudioService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    audioService = TestBed.inject(AudioService) as unknown as MockAudioService;
    fixture.detectChanges();
  });

  it('should create and initalize sound', () => {
    expect(component).toBeTruthy();
    expect(audioService.initAudio).toHaveBeenCalledWith(
      'introSound',
      'assets/sounds/intro.wav',
      true,
    );
  });

  it('should have a link', () => {
    const link = fixture.debugElement.query(By.directive(RouterLink));
    expect(link).toBeTruthy();
  });

  it('should render title in a h1 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Discover Your Perfect Adventure!',
    );
  });

  it('should toggle isMuted signal and call audio service setMute', () => {
    spyOn(component, 'stopIntroSound');
    spyOn(component, 'startIntroSound');

    expect(component.isMuted()).toBeTrue();
    // Since mute is true by default so it should be false after toggle
    component.toggleMute();
    expect(component.isMuted()).toBeFalse();
    expect(audioService.setMute).toHaveBeenCalledWith('introSound', false);
    expect(component.startIntroSound).toHaveBeenCalled();
    expect(component.stopIntroSound).not.toHaveBeenCalled();

    // Toggle again
    component.toggleMute();
    expect(component.isMuted()).toBeTrue();
    expect(audioService.setMute).toHaveBeenCalledWith('introSound', true);
    expect(component.stopIntroSound).toHaveBeenCalled();
    expect(component.startIntroSound).toHaveBeenCalledTimes(1); //Called that first time
  });

  it('should play intro sound on user interaction', () => {
    component.startIntroSound();
    expect(audioService.playAudio).toHaveBeenCalledWith(INTRO_SOUND_KEY);
  });

  it('should stop intro sound on destroy', () => {
    component.ngOnDestroy();
    expect(audioService.destroyAudio).toHaveBeenCalledWith(INTRO_SOUND_KEY);
  });
});
