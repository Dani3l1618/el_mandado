import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ComputeService {
  public unitPrice(price: number, quantity: number): number {
    const rawPrice = price / quantity;
    // Se redondea a dos décimales
    return Math.round(rawPrice * 100) / 100;
  }

  /** Genera el nombre con la fecha de hoy mas sufijo: 22-03-2025-sufix */
  public generateDateName(sufix: string): string {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };

    const localDate = currentDate
      .toLocaleDateString('es-MX', options)
      .replace(/\//g, '-');

    return `${localDate}-${sufix.replaceAll(' ', '')}`;
  }
}
