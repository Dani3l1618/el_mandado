import {
  Component,
  effect,
  inject,
  model,
  OnInit,
  signal,
} from '@angular/core';
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
  IonText,
  ModalController,
} from '@ionic/angular/standalone';
import { MaskitoDirective } from '@maskito/angular';
import { maskitoTransform } from '@maskito/core';
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
  IonText,

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
export class ListShopFormComponent implements OnInit {
  private readonly modalController = inject(ModalController);
  private readonly dataServce = inject(DataService);
  private readonly computedService = inject(ComputeService);
  private readonly fb = inject(NonNullableFormBuilder);

  private listShopService!: ListShopService;

  protected itemForm = this.fb.group({
    name: this.fb.control(''),
    price: this.fb.control('', [Validators.required, Validators.min(1)]),
    quantity: this.fb.control(1, [Validators.min(1), Validators.max(20)]),
    barcode: this.fb.control<string | undefined>(undefined),
  });

  protected unitPrice = model(true);
  protected readonly maskito = MASK_OPTIONS;
  protected helperPrice = signal('');

  constructor() {
    effect(
      () => {
        const unitPrice = this.unitPrice();
        if (unitPrice) {
          this.itemForm.controls.quantity.setValue(1);
          this.helperPrice.set('');
        }
      },
      { allowSignalWrites: true },
    );
  }

  ngOnInit(): void {
    this.quantityListener();
  }

  confirm() {
    if (!this.sendItem()) return;
    this.modalController.dismiss();
  }

  nexItem() {
    if (!this.sendItem()) return;
    this.itemForm.reset();
    this.unitPrice.set(true);
  }

  private sendItem(): boolean {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      return false;
    }

    const newItem = this.generateItem();

    if (!newItem) return false;

    this.saveItem({ ...newItem });

    return true;
  }

  private generateItem(): ListShopItemForm | null {
    const { price: pr, ...rest } = this.itemForm.getRawValue();

    const price = this.getPrice(pr, rest.quantity, () =>
      this.itemForm.get('price')?.setErrors({ invalid: true }),
    );

    return { ...rest, price };
  }

  private saveItem(newItem: ListShopItemForm): void {
    return this.listShopService.addNewItem(newItem);
  }

  private quantityListener() {
    const priceForm = this.itemForm.controls.price;
    const quantityForm = this.itemForm.controls.quantity;
    this.itemForm.valueChanges.subscribe({
      next: () => {
        const quantity = quantityForm.value;

        if (quantity === 1) {
          this.helperPrice.set('');
          return;
        }
        const price = this.getPrice(priceForm.value, quantity, () =>
          this.helperPrice.set(''),
        ).toString();

        this.helperPrice.set(
          `(${maskitoTransform(price, this.maskito.options)})`,
        );
      },
    });
  }

  private getPrice(
    priceStr: string,
    quantity: number,
    onError: () => void,
  ): number {
    let price = this.dataServce.priceStringToNumber(priceStr);

    if (isNaN(price)) {
      onError();
      throw Error('price is not a number');
    }

    return this.computedService.unitPrice(price, quantity);
  }
}