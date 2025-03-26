import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(date: string): string {
    const dateString = date.replace('T', ' ').slice(0, 19);
    return dateString;
  }
}
