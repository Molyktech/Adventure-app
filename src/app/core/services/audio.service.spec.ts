/* eslint  @typescript-eslint/no-explicit-any: 0*/
import { TestBed } from '@angular/core/testing';
import { AudioService } from './audio.service';

function getAudioElement(
  service: AudioService,
  soundKey: string,
): HTMLAudioElement | undefined {
  return (service as any).audioElements.get(soundKey);
}

describe('AudioService', () => {
  let service: AudioService;
  const audioUrl = 'assets/sounds/click.wav';
  let audioElement: HTMLAudioElement | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AudioService],
    });
    service = TestBed.inject(AudioService);
  });
  afterEach(() => {
    service.destroyAll();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize an audio element', () => {
    service.initAudio('testSound', audioUrl);
    audioElement = getAudioElement(service, 'testSound');
    expect(audioElement).toBeTruthy();
    expect(audioElement?.src).toContain(audioUrl);
    expect(audioElement?.loop).toBeFalse();
  });

  it('should play the audio when playAudio is called', async () => {
    service.initAudio('testSound', audioUrl);

    spyOn(
      (service as any).audioElements.get('testSound')!,
      'play',
    ).and.callThrough();
    await service.playAudio('testSound');

    expect(
      (service as any).audioElements.get('testSound')!.play,
    ).toHaveBeenCalled();
  });

  it('should catch and log play errors', async () => {
    service.initAudio('testSound', 'invalid/path/to/sound.wav');

    const playSpy = spyOn(
      (service as any).audioElements.get('testSound')!,
      'play',
    ).and.returnValue(Promise.reject('Play error'));
    const consoleSpy = spyOn(console, 'error');

    await service.playAudio('testSound');

    expect(playSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error playing audio (testSound):',
      'Play error',
    );
  });

  it('should pause the audio when pauseAudio is called', () => {
    service.initAudio('testSound', audioUrl);

    spyOn(
      (service as any).audioElements.get('testSound')!,
      'pause',
    ).and.callThrough();
    service.pauseAudio('testSound');

    expect(
      (service as any).audioElements.get('testSound')!.pause,
    ).toHaveBeenCalled();
  });

  it('should stop the audio when stopAudio is called', () => {
    service.initAudio('testSound', audioUrl);

    audioElement = getAudioElement(service, 'testSound');
    spyOn(audioElement!, 'pause').and.callThrough();

    service.stopAudio('testSound');

    expect(audioElement!.pause).toHaveBeenCalled();
    expect(audioElement!.currentTime).toBe(0);
  });

  it('should set mute state correctly', () => {
    service.initAudio('testSound', audioUrl);

    service.setMute('testSound', true);
    expect((service as any).audioElements.get('testSound')!.muted).toBeTrue();

    service.setMute('testSound', false);
    expect((service as any).audioElements.get('testSound')!.muted).toBeFalse();
  });
  it('should clean up an audio element when destroyAudio is called', () => {
    service.initAudio('testSound', audioUrl);

    audioElement = getAudioElement(service, 'testSound');
    spyOn(audioElement!, 'pause').and.callThrough();

    service.destroyAudio('testSound');

    expect(audioElement!.pause).toHaveBeenCalled();
    expect((service as any).audioElements.get('testSound')).toBeUndefined();
  });

  it('should clean up all audio elements when destroyAll is called', () => {
    service.initAudio('testSound1', 'assets/sounds/test1.wav');
    service.initAudio('testSound2', 'assets/sounds/test2.wav');

    const audioElement1 = (service as any).audioElements.get('testSound1');
    const audioElement2 = (service as any).audioElements.get('testSound2');

    spyOn(audioElement1!, 'pause').and.callThrough();
    spyOn(audioElement2!, 'pause').and.callThrough();

    service.destroyAll();

    expect(audioElement1!.pause).toHaveBeenCalled();
    expect(audioElement2!.pause).toHaveBeenCalled();
    expect((service as any).audioElements.size).toBe(0);
  });
});
