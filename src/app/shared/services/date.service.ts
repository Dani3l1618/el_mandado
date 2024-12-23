import { Injectable } from '@angular/core';
import { format, toZonedTime } from 'date-fns-tz';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  private readonly timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  formatUTC(date: string): string {
    const d = new Date(date);
    const zonedTime = toZonedTime(d, this.timeZone);
    const formated = format(zonedTime, "yyyy-MM-dd'T'HH:mm:ss.SSS", {
      timeZone: this.timeZone,
    });

    return formated;
  }

  setToMidnight(date: string): string {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.toISOString();
  }

  setToEndDate(date: string): string {
    const d = new Date(date);
    d.setHours(23, 59, 59, 0);
    return d.toISOString();
  }
}
