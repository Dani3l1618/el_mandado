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
}
