import { Component, effect, inject, model } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonCheckbox,
  IonContent,
  IonInput,
  IonItem,
  ModalController,
} from '@ionic/angular/standalone';
import { MaskitoDirective } from '@maskito/angular';
import {
  ComputeService,
  DataService,
  MASK_OPTIONS,
  SharedDialogFooterComponent,
  SharedDialogHeaderComponent,
} from 'src/app/shared';
import { ListShopItemForm } from '../../models/list-shop.model';
import { ListShopService } from '../../services/list-shop.service';

const imports = [
  IonContent,
  IonCheckbox,
  IonInput,
  IonItem,

  MaskitoDirective,
  ReactiveFormsModule,
  FormsModule,

  SharedDialogHeaderComponent,
  SharedDialogFooterComponent,
];

@Component({
  selector: 'app-list-shop-form',
  templateUrl: './list-shop-form.component.html',
  styleUrls: ['./list-shop-form.component.scss'],
  standalone: true,
  imports,
})
export class ListShopFormComponent {
  private fb = inject(NonNullableFormBuilder);
  private modalController = inject(ModalController);

  private dataServce = inject(DataService);
  private computedService = inject(ComputeService);
  private listShopService!: ListShopService;

  protected itemForm = this.fb.group({
    name: this.fb.control(''),
    price: this.fb.control('', [Validators.required, Validators.min(1)]),
    quantity: this.fb.control(1, [Validators.min(1), Validators.max(20)]),
    barcode: this.fb.control<string | undefined>(undefined),
  });

  protected unitPrice = model(true);
  protected readonly maskito = MASK_OPTIONS;

  constructor() {
    effect(() => {
      const unitPrice = this.unitPrice();
      if (unitPrice) {
        this.itemForm.controls.quantity.setValue(1);
      }
    });
  }

  confirm() {
    if (!this.sendItem()) return;
    this.modalController.dismiss();
  }

  nexItem() {
    if (!this.sendItem()) return;
    this.itemForm.reset();
  }

  private sendItem(): boolean {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      return false;
    }

    const newItem = this.generateItem();

    if (!newItem) return false;

    this.listShopService.addNewItem({ ...newItem });
    return true;
  }

  private generateItem(): ListShopItemForm | null {
    const { price: pr, ...rest } = this.itemForm.getRawValue();

    let price = this.dataServce.priceStringToNumber(pr);

    if (isNaN(price)) {
      this.itemForm.get('price')?.setErrors({ invalid: true });
      return null;
    }

    if (rest.quantity > 1) {
      price = this.computedService.unitPrice(price, rest.quantity);
    }

    return { ...rest, price };
  }
}
