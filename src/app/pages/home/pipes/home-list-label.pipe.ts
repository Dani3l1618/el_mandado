import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'homeListLabel',
  standalone: true,
  pure:true
})
export class HomeListLabelPipe implements PipeTransform {

  transform(value: string): string {
    return `(${value})`;
  }

}
