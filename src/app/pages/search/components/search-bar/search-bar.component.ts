import { Component, inject } from '@angular/core';
import { IonSearchbar, SearchbarCustomEvent } from '@ionic/angular/standalone';
import { OrderState, SharedChipToggleComponent } from 'src/app/shared';
import { SortSearchProductKey } from '../../model/search.model';
import { SearchService } from '../../service/search.service';

const imports = [IonSearchbar, SharedChipToggleComponent];
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  imports,
})
export class SearchBarComponent {
  protected readonly DEBOUNCE_TIME = 300;
  private readonly searchService = inject(SearchService);

  public search(event: SearchbarCustomEvent) {
    const term = event.detail.value ?? '';
    this.searchService.search(term);
  }

  public sort(value: OrderState, key: keyof SortSearchProductKey) {
    this.searchService.sort(value, key);
  }
}
