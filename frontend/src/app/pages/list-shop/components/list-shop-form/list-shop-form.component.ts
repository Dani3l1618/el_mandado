import {
  AfterViewInit,
  Component,
  computed,
  effect,
  inject,
  model,
  OnInit,
  signal,
  viewChild,
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
import { ListShopItem, ListShopItemForm } from '../../models/list-shop.model';
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
export class ListShopFormComponent implements OnInit, AfterViewInit {
  private readonly modalController = inject(ModalController);
  private readonly dataServce = inject(DataService);
  private readonly computedService = inject(ComputeService);
  private readonly fb = inject(NonNullableFormBuilder);

  private listShopService!: ListShopService;
  private itemOnEdit = signal<ListShopItem | undefined>(undefined);
  editMode = computed(() => this.itemOnEdit() !== undefined);

  protected itemForm = this.fb.group({
    name: this.fb.control(''),
    price: this.fb.control('', [Validators.required, Validators.min(1)]),
    quantity: this.fb.control(1, [Validators.min(1), Validators.max(20)]),
    barcode: this.fb.control<string | undefined>(undefined),
  });

  private priceInput = viewChild<IonInput>('priceInput');

  protected divedPrice = model(false);
  protected readonly maskito = MASK_OPTIONS;
  protected helperPrice = signal('');

  constructor() {
    effect(() => {
      this.divedPrice();
      this.itemForm.updateValueAndValidity({ emitEvent: true });

      if (this.editMode()) {
        this.updateForm();
      }
    });
  }

  ngOnInit(): void {
    this.quantityListener();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.priceInput()?.setFocus(), 100);
  }

  confirm() {
    if (!this.sendItem()) return;
    this.modalController.dismiss();
  }

  nexItem() {
    if (!this.sendItem()) return;
    this.itemForm.reset();
    this.divedPrice.set(false);
    this.priceInput()?.setFocus();
  }

  private sendItem(): boolean {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      this.priceInput()?.setFocus();
      return false;
    }

    const newItem = this.generateItem();

    if (!newItem) return false;

    this.saveItem({ ...newItem });

    return true;
  }

  private generateItem(): ListShopItemForm | null {
    const { price: pr, ...rest } = this.itemForm.getRawValue();

    const price = this.getPrice(() =>
      this.itemForm.get('price')?.setErrors({ invalid: true }),
    );

    return { ...rest, price };
  }

  private saveItem(newItem: ListShopItemForm): void {
    this.listShopService.addNewItem(newItem);
  }

  private quantityListener() {
    this.itemForm.valueChanges.subscribe({
      next: ({ quantity }) => {
        let price = 0;
        if (quantity === 1) {
          this.helperPrice.set('');
          return;
        }

        price = this.getPrice(() => this.helperPrice.set(''));

        if (!this.divedPrice()) {
          price = price * quantity!;
        }

        this.helperPrice.set(
          `(${maskitoTransform(price.toString(), this.maskito.options)})`,
        );
      },
    });
  }

  private getPrice(onError: () => void): number {
    const priceStr = this.itemForm.controls.price.value;
    const quantity = this.itemForm.controls.quantity.value;

    let price = this.dataServce.priceStringToNumber(priceStr);

    if (isNaN(price)) {
      onError();
      return 0;
    }

    if (this.divedPrice()) {
      return this.computedService.unitPrice(price, quantity);
    }

    return price;
  }

  //.- Edit Mode
  edit() {
    if (!this.editMode()) return;

    const { price: pr, ...rest } = this.itemForm.getRawValue();
    const price = this.getPrice(() =>
      this.itemForm.get('price')?.setErrors({ invalid: true }),
    );

    this.listShopService.editListShopItem(this.itemOnEdit()!.id, {
      price,
      ...rest,
    });

    this.modalController.dismiss();
  }

  private updateForm(): void {
    if (!this.editMode()) return;

    const { name, quantity, price: pr } = this.itemOnEdit()!;

    const price = maskitoTransform(pr.toString(), MASK_OPTIONS.options);

    this.itemForm.patchValue({ name, price, quantity });
  }
}
