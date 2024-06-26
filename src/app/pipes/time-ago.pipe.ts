import { Pipe, PipeTransform } from '@angular/core';

type DateOrStringOrNumber = Date | string | number;

/**
 * TimeAgoPipe: Converts a date into a human-readable 'time ago' format.
 * This implementation was inspired by a solution found on Stack Overflow.
 * Reference: https://stackoverflow.com/a/61341940 (Accessed on June 20, 2024)
 */
@Pipe({
  name: 'timeAgo',
  pure: true,
  standalone: true,
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: DateOrStringOrNumber): DateOrStringOrNumber {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29)
        // less than 30 seconds ago will show as 'Just now'
        return 'Just now';
      const intervals: Record<string, number> = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
      };
      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0)
          if (counter === 1) {
            return counter + ' ' + i + ' ago'; // singular (1 day ago)
          } else {
            return counter + ' ' + i + 's ago'; // plural (2 days ago)
          }
      }
    }
    return value;
  }
}
