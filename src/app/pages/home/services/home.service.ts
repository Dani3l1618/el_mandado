import { Injectable, signal, Signal } from '@angular/core';
import { HomeRows } from '../models/home-card.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  getResume(): Signal<HomeRows[]>{

    const rows: HomeRows[] = [
      {
        id: 1,
        data: [
          {
            id: 'expensive',
            data: '2328',
            title: 'Gasto total del mes',
            icon: 'cash',
            pipe: {
              dataType: 'currency',
              format: '1.2-2',
            },
          },
          {
            id: 'products',
            data: '22',
            title: 'Productos comprados',
            icon: 'cart',
            pipe: {
              dataType: 'str',
              format: '',
            },
          },
        ],
      },
  
      {
        id: 2,
        data: [
          {
            id: 'expensive',
            data: ['Papel de baño', '51'],
            title: 'Productos más caro',
            icon: 'bag',
            pipe: {
              dataType: 'home-expensive',
              format: '1.2-2',
            },
            cssClass: 'card--sm',
          },
          {
            id: 'location',
            data: [new Date(2024, 0, 12).toJSON(), 'Aurrera'],
            title: 'Ubicación',
            icon: 'pin',
            pipe: {
              dataType: 'home-location',
              format: 'dd/LLL',
            },
            cssClass: 'card--sm',
          },
        ],
      },
    ];

    return signal(rows)
  }
}
