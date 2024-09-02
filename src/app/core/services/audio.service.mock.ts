export class MockAudioService {
  initAudio = jasmine.createSpy('initAudio');
  playAudio = jasmine.createSpy('playAudio').and.returnValue(Promise.resolve());
  pauseAudio = jasmine.createSpy('pauseAudio');
  stopAudio = jasmine.createSpy('stopAudio');
  setMute = jasmine.createSpy('setMute');
  destroyAudio = jasmine.createSpy('destroyAudio');
  destroyAll = jasmine.createSpy('destroyAll');
}
