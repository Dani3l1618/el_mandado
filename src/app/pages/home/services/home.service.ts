import { Injectable, signal, Signal } from '@angular/core';
import { HomeRows } from '../models/home-card.model';
import { HomeListItem } from '../models/home-list.model';

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

  getListItems(): Signal<HomeListItem[]> {
    const items: HomeListItem[] = [
      {
        title: 'Total gastado',
        label: '6 meses',
        data: '12560',
        icon: 'list',
        id: 1,
        pipe: 'currency',
      },
      {
        title: 'Gasto mensual',
        label: 'promedio',
        data: '4560',
        icon: 'wallet',
        id: 2,
        pipe: 'currency',
      },
      {
        title: 'Tiempo',
        label: 'promedio',
        data: '4560',
        icon: 'time',
        id: 3,
        pipe: 'time',
      },
    ];
    return signal(items);
  }
}
