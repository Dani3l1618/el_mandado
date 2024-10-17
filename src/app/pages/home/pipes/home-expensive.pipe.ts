import { CurrencyPipe } from '@angular/common';
import { inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'homeExpensive',
  standalone: true,
  pure:true
})
export class HomeExpensivePipe implements PipeTransform {

  currency = inject(CurrencyPipe);

  transform(value: string[], args: string): string {
    const c = this.currency.transform(value[1], 'USD', 'symbol', args, 'en-US');

    return `${value[0]}: ${c}`;
  }

}
