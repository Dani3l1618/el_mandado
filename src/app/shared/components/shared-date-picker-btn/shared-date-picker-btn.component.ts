import { Component, input, model, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonDatetime,
  IonDatetimeButton,
  IonModal,
} from '@ionic/angular/standalone';
import { v4 } from 'uuid';

const imports = [IonDatetime, IonDatetimeButton, IonModal, FormsModule];

@Component({
  selector: 'app-shared-date-picker-btn',
  templateUrl: './shared-date-picker-btn.component.html',
  styleUrls: ['./shared-date-picker-btn.component.scss'],
  imports,
})
export class SharedDatePickerBtnComponent {
  readonly presentation = input<string>('date');
  readonly minYear = input<string>('2020-01-01');
  readonly maxYear = input<string>(new Date().toISOString());
  dateSelected = model<string>(this.minYear()); // dateSelectedChange is output

  protected readonly pickerId = v4();
  private readonly picker = viewChild<IonDatetime>('picker');

  public resetPicker(startDate?: string) {
    this.picker()?.reset(startDate);
    this.dateSelected.set(startDate ?? this.minYear());
  }
}
