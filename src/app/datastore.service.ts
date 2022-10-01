import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatastoreService {
  slots = Array(10).fill(false);
  dates: string[] = Array(10).fill('');
  constructor() {
    this.initData();
  }

  toggleSlot(index: number) {
    this.slots[index] = !this.slots[index];
    this.dates[index] = this.slots[index]
      ? new Date().toLocaleDateString().split('.').slice(0, 2).join('.')
      : '';
    this.persit();
  }

  reset() {
    this.slots = Array(10).fill(false);
    this.dates = Array(10).fill('');
    this.persit();
  }

  persit() {
    localStorage.setItem('slots', JSON.stringify(this.slots));
    localStorage.setItem('dates', JSON.stringify(this.dates));
  }

  initData() {
    const storedSlots = localStorage.getItem('slots');
    const storedDates = localStorage.getItem('dates');

    this.slots = storedSlots ? JSON.parse(storedSlots) : this.slots;
    this.dates = storedDates ? JSON.parse(storedDates) : this.dates;
  }
}
