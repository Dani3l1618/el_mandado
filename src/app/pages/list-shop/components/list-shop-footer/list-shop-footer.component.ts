import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  IonFooter,
  IonRippleEffect,
  IonText,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ListShopService } from '../../services/list-shop.service';

const imports = [IonFooter, IonToolbar, IonText, IonRippleEffect, CurrencyPipe];

@Component({
  selector: 'app-list-shop-footer',
  templateUrl: './list-shop-footer.component.html',
  styleUrls: ['./list-shop-footer.component.scss'],
  standalone: true,
  imports,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListShopFooterComponent {
  private listShopService = inject(ListShopService);
  private totalColor = [
    { max: 85, color: 'white' },
    { max: 100, color: 'warning' },
  ];

  budget = computed(() => this.listShopService.storeConfig()?.budget ?? 0.001);

  rest = computed(() => this.budget() - this.total());

  total = signal(0); // topar el valor a 9999

  colorTotal = computed(() => {
    const porcent = (this.total() / this.budget()) * 100;
    return this.getColor(porcent);
  });

  private getColor(porcent: number): string {
    const color = this.totalColor.find((c) => porcent <= c.max);

    return color?.color ?? 'danger';
  }
}