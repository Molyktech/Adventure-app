import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audioElements = new Map<string, HTMLAudioElement>();

  /**
   * Initializes an audio element.
   * @param key - Unique key to reference the audio.
   * @param src - Source URL of the audio file.
   * @param loop - Whether the audio should loop.
   * @param preload - Whether to preload the audio.
   */
  initAudio(
    key: string,
    src: string,
    loop = false,
    preload = true,
  ): void {
    if (this.audioElements.has(key)) return;

    const audio = new Audio(src);
    audio.muted = true;
    audio.loop = loop;

    audio.preload = preload ? 'auto' : 'none';

    this.audioElements.set(key, audio);
  }

  /**
   * Plays the audio associated with the given key.
   * @param key - Unique key referencing the audio.
   */
  playAudio(key: string): Promise<void> | undefined {
    const audio = this.audioElements.get(key);

    if (audio) {
      return audio.play().catch((error) => {
        console.error(`Error playing audio (${key}):`, error);
      });
    }

    return undefined; // Add a return statement to handle the case when audio is not found.
  }

  /**
   * Pauses the audio associated with the given key.
   * @param key - Unique key referencing the audio.
   */
  pauseAudio(key: string): void {
    const audio = this.audioElements.get(key);
    if (audio) {
      audio.pause();
    }
  }

  /**
   * Stops the audio and resets its current time.
   * @param key - Unique key referencing the audio.
   */
  stopAudio(key: string): void {
    const audio = this.audioElements.get(key);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  /**
   * Mutes or unmutes the audio associated with the given key.
   * @param key - Unique key referencing the audio.
   * @param muted - Mute state.
   */
  setMute(key: string, muted: boolean): void {
    const audio = this.audioElements.get(key);
    if (audio) {
      audio.muted = muted;
    }
  }

  /**
   * Cleas up the audio element associated with the given key.
   * @param key - Unique key referencing the audio.
   */
  destroyAudio(key: string): void {
    const audio = this.audioElements.get(key);
    if (audio) {
      audio.pause();
      audio.src = '';
      this.audioElements.delete(key);
    }
  }

  /**
   * Cleans up all audio elements.
   */
  destroyAll(): void {
    this.audioElements.forEach((audio, key) => {
      this.destroyAudio(key);
    });
  }
}
