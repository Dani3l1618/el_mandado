import { Component, inject, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { AppRoutes } from 'src/app/app.routes';
import { SharedHeaderPageComponent } from 'src/app/shared/components/shared-header-page/shared-header-page.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchListComponent } from './components/search-list/search-list.component';
import { SearchService } from './service/search.service';

const imports = [
  IonContent,
  SharedHeaderPageComponent,
  SearchListComponent,
  SearchBarComponent,
];

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  imports,
})
export class SearchPage implements OnInit {
  private readonly searchService = inject(SearchService);
  defaultHref = AppRoutes.home;
  searchables = this.searchService.searchProducts.asReadonly();

  ngOnInit(): void {
    this.searchService.loadProducts();
  }
}
