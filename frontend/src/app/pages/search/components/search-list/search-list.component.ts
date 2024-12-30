import { Component, inject } from '@angular/core';
import { IonList } from '@ionic/angular/standalone';
import { SearchService } from '../../service/search.service';
import { SearchProductComponent } from '../search-product/search-product.component';

const imports = [IonList, SearchProductComponent];

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
  imports,
})
export class SearchListComponent {
  private readonly searchService = inject(SearchService);
  products = this.searchService.searchProducts.asReadonly();
}
