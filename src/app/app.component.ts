import { DatastoreService } from './datastore.service';
import { Component } from '@angular/core';
import confetti from 'canvas-confetti';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'bk-stamp-card';
  successAchieved = false;

  constructor(private dataStore: DatastoreService) {}

  get slots() {
    return this.dataStore.slots;
  }

  get dates() {
    return this.dataStore.dates;
  }

  toggleSlot(index: number) {
    this.dataStore.toggleSlot(index);

    const position = document
      .getElementById('slot-' + index)
      ?.getBoundingClientRect();
    if (!position) return;

    if (!this.dataStore.slots.includes(false)) {
      this.allComplete();
    } else if (this.dataStore.slots[index]) {
      confetti({
        shapes: ['square'],
        particleCount: 100,
        origin: {
          y: (position.y + 60) / window.innerHeight,
          x: (position.x + 60) / window.innerWidth,
        },
      });
    }
  }

  allComplete() {
    this.successAchieved = true;
    var end = Date.now() + 5 * 1000;
    setTimeout(() => {
      this.successAchieved = false;
      this.dataStore.reset();
    }, 7000);

    (function frame() {
      confetti({
        particleCount: 10,
        angle: 60,
        spread: 100,
        origin: { x: 0, y: 0.6 },
      });
      confetti({
        particleCount: 10,
        angle: 120,
        spread: 100,
        origin: { x: 1, y: 0.6 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
}
