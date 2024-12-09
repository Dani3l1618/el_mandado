import { Component, inject, model, OnInit, signal } from '@angular/core';
import { FormsModule, NonNullableFormBuilder } from '@angular/forms';
import {
  IonContent,
  IonItem,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import {
  SELECT_INTERFACE_OPTIONS,
  SharedDialogFooterComponent,
  SharedDialogHeaderComponent,
} from 'src/app/shared';
import { ListShop } from '../../models/list-shop.model';
import { ListShopService } from '../../services/list-shop.service';

const imports = [
  IonContent,
  IonItem,
  IonSelect,
  IonSelectOption,

  FormsModule,

  SharedDialogFooterComponent,
  SharedDialogHeaderComponent,
];

@Component({
  selector: 'app-list-shop-select-draft',
  templateUrl: './list-shop-select-draft.component.html',
  styleUrls: ['./list-shop-select-draft.component.scss'],
  standalone: true,
  imports,
})
export class ListShopSelectDraftComponent implements OnInit {
  private listShopService!: ListShopService;
  private fb = inject(NonNullableFormBuilder);
  protected selectOptions = SELECT_INTERFACE_OPTIONS;

  draft = model<string>();
  drafts = signal<ListShop[]>([]);

  ngOnInit(): void {
    this.drafts = this.listShopService.listDrafts;
  }

  confirm() {
    console.log('xd');
  }
}
