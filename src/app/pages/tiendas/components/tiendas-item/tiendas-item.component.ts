import { TitleCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import {
  IonAvatar,
  IonIcon,
  IonItem,
  IonItemSliding,
  IonLabel,
  IonNote,
} from '@ionic/angular/standalone';
import { MediaStorePipe, SharedListOptionsComponent } from 'src/app/shared';
import { Store } from '../../models';
import { AdressPipe } from '../../pipe';

const imports = [
  IonItem,
  IonLabel,
  IonItemSliding,
  IonIcon,
  IonNote,
  IonAvatar,

  TitleCasePipe,
  MediaStorePipe,
  AdressPipe,
  SharedListOptionsComponent,
];

@Component({
  selector: 'app-tiendas-item',
  templateUrl: './tiendas-item.component.html',
  styleUrls: ['./tiendas-item.component.scss'],
  standalone: true,
  imports,
})
export class TiendasItemComponent {
  store = input.required<Store>();
  delete = output<Store>();
  edit = output<Store>();

  protected onDelete() {
    this.delete.emit(this.store());
  }

  protected onEdit() {
    this.edit.emit(this.store());
  }
}
