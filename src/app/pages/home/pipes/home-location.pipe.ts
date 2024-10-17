import { DatePipe } from '@angular/common';
import { inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'homeLocation',
  standalone: true
})
export class HomeLocationPipe implements PipeTransform {
  datePipe = inject(DatePipe);

  transform(value: string[], args: string): string {
    const date = this.datePipe.transform(value[0], args);

    return `${date},\n ${value[1]}`;
  }

}
