import { Component, inject, linkedSignal, viewChildren } from '@angular/core';
import {
  IonButton,
  IonIcon,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { SharedDatePickerBtnComponent } from 'src/app/shared/components/shared-date-picker-btn/shared-date-picker-btn.component';
import { HistoryFilter } from '../../models/history-filter.model';
import { HistoryService } from '../../services/history.service';

const imports = [
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  SharedDatePickerBtnComponent,
];

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss'],
  standalone: true,
  imports,
})
export class HistoryFilterComponent {
  private readonly historyService = inject(HistoryService);
  private filter: HistoryFilter = {};

  protected readonly stores = this.historyService.stores.asReadonly();
  protected readonly minDateFirstFilter = this.historyService.minDateOfShopping;
  protected readonly minDateSecondFilter = linkedSignal<string>(() =>
    this.minDateFirstFilter(),
  );
  protected readonly today = new Date().toISOString();
  private readonly pickers = viewChildren(SharedDatePickerBtnComponent);

  protected filtering(filter: HistoryFilter) {
    this.filter = { ...this.filter, ...filter };
    this.historyService.filterShopList(this.filter);
  }

  protected onDateChange(date: string, type: 'start' | 'end') {
    if (type === 'start') {
      this.filtering({ startDate: date });
      this.minDateSecondFilter.set(date);
      return;
    }

    this.filtering({ endDate: date });
  }

  protected resetDateFilters() {
    const pickers = this.pickers();
    pickers[0].resetPicker(this.minDateFirstFilter());
    pickers[1].resetPicker(new Date().toISOString());
  }

  protected clearFilter() {
    this.filtering({
      startDate: undefined,
      endDate: undefined,
      storeId: undefined,
    });
  }
}
