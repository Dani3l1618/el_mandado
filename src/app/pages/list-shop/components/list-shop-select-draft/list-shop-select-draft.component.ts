import { Component, inject, model, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonItem,
  IonSelect,
  IonSelectOption,
  ModalController,
} from '@ionic/angular/standalone';
import {
  SELECT_INTERFACE_OPTIONS,
  SharedDialogFooterComponent,
  SharedDialogHeaderComponent,
} from 'src/app/shared';
import { ListShop } from '../../models/list-shop.model';
import { ListShopStateService } from '../../services/list-shop-state.service';
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
  private state!: ListShopStateService;
  protected selectOptions = SELECT_INTERFACE_OPTIONS;
  private modalController = inject(ModalController);

  draft = model<string>();
  drafts = signal<ListShop[]>([]);

  ngOnInit(): void {
    this.drafts = this.state.listDrafts;
  }

  confirm() {
    const id = this.draft();

    if (!id) return;

    const list = this.getList(id);

    this.modalController.dismiss(list);
  }

  private getList(id: string): ListShop {
    return this.drafts().find((item) => item.id === id)!;
  }
}
