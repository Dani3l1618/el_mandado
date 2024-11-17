import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '../models';

@Pipe({
  name: 'adress',
  standalone: true,
  pure: true,
})
export class AdressPipe implements PipeTransform {
  transform(value: Store): string {
    return `${value.street} ${value.colonia}, ${value.postalCode}, ${value.city} `;
  }
}
