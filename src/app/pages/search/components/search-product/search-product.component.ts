import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, input, resource } from '@angular/core';
import { IonItem } from '@ionic/angular/standalone';
import { AdressPipe } from 'src/app/shared';
import { SharedStoreImgComponent } from 'src/app/shared/components/shared-store-img/shared-store-img.component';
import { SearchProduct } from '../../model/search.model';
import { SearchService } from '../../service/search.service';

const imports = [
  IonItem,
  CurrencyPipe,
  DatePipe,
  AdressPipe,
  SharedStoreImgComponent,
];
@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss'],
  imports,
})
export class SearchProductComponent {
  private readonly searchService = inject(SearchService);
  product = input.required<SearchProduct>();

  readonly store = resource({
    request: this.product,
    loader: async ({ request: product }) =>
      await this.searchService.getStoreById(product.storeId),
  });
}
