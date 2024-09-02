import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, RouterLink } from '@angular/router';
import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let playSpy: jasmine.Spy;
  let pauseSpy: jasmine.Spy;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    spyOn(window, 'Audio').and.returnValue({
      load: jasmine.createSpy('load'),
      addEventListener: jasmine.createSpy('addEventListener'),
      removeEventListener: jasmine.createSpy('removeEventListener'),
      loop: false,
      muted: false,
    } as unknown as HTMLAudioElement);

    // Saving these as variables for easy reuse
    playSpy = spyOn(component.introSound, 'play').and.returnValue(
      Promise.resolve(),
    );

    //eslint-disable-next-line @typescript-eslint/no-empty-function
    pauseSpy = spyOn(component.introSound, 'pause').and.callFake(() => {});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
  it('should toggle mute and play/pause the intro sound', () => {
    // Initially, isMuted is false but after ngOnInit is called it is true so the user interacts with the page before the sound starts playing
    fixture.detectChanges(); // This triggers ngOnInit
    expect(component.isMuted).toBeTrue();

    // Toggle mute (which should unmute the sound)
    component.toggleMute();
    expect(component.isMuted).toBeFalse();
    expect(component.introSound.muted).toBeFalse();
    expect(playSpy).toHaveBeenCalled(); // Expect play to be called

    // Toggle mute again (which should mute the sound)
    component.toggleMute();
    expect(component.isMuted).toBeTrue();
    expect(component.introSound.muted).toBeTrue();
  });

  it('should stop the intro sound on component destroy', () => {
    //eslint-disable-next-line @typescript-eslint/no-empty-function
    spyOn(component.introSound, 'removeEventListener').and.callFake(() => {});

    fixture.detectChanges();
    component.ngOnDestroy();

    expect(pauseSpy).toHaveBeenCalled();
    expect(component.introSound.removeEventListener).toHaveBeenCalled();
  });
});
