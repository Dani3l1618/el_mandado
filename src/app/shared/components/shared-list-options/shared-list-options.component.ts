import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import {
  IonIcon,
  IonItemOption,
  IonItemOptions,
} from '@ionic/angular/standalone';

const imports = [IonItemOptions, IonItemOption, IonIcon, NgClass];
@Component({
  selector: 'app-shared-list-options',
  templateUrl: './shared-list-options.component.html',
  styleUrls: ['./shared-list-options.component.scss'],
  standalone: true,
  imports,
})
export class SharedListOptionsComponent {
  btnToShow = input<{ delete?: boolean; edit?: boolean }>({
    delete: true,
    edit: true,
  });

  cssClass = input<string>('');

  delete = output<void>();
  edit = output<void>();

  onDelete() {
    this.delete.emit();
  }

  onEdit() {
    this.edit.emit();
  }
}
