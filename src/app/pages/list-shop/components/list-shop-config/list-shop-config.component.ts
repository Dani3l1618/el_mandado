import { Component, inject, signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonInput,
  IonItem,
  IonSelect,
  IonSelectOption,
  ModalController,
} from '@ionic/angular/standalone';
import { MaskitoDirective } from '@maskito/angular';
import { MaskitoElementPredicate } from '@maskito/core';
import { Store } from 'src/app/pages/tiendas/models';
import {
  AdressPipe,
  MASK_CURRECY,
  SELECT_INTERFACE_OPTIONS,
  SharedDialogFooterComponent,
  SharedDialogHeaderComponent,
} from 'src/app/shared';
import { ListShopConfig } from '../../models/list-shop.model';
import { ListShopStoreSelectPipe } from '../../pipes/list-shop-store-select.pipe';

const imports = [
  IonContent,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonInput,

  ReactiveFormsModule,
  MaskitoDirective,

  SharedDialogHeaderComponent,
  SharedDialogFooterComponent,
  ListShopStoreSelectPipe,
];

@Component({
  selector: 'app-list-shop-config',
  templateUrl: './list-shop-config.component.html',
  styleUrls: ['./list-shop-config.component.scss'],
  standalone: true,
  imports,
  providers: [AdressPipe],
})
export class ListShopConfigComponent {
  private modalController = inject(ModalController);
  private fb = inject(NonNullableFormBuilder);
  maskOptions = MASK_CURRECY;

  configForm = this.fb.group({
    storeId: this.fb.control('', Validators.required),
    budget: this.fb.control('', [Validators.required, Validators.min(3)]),
  });

  stores = signal<Store[]>([]);

  readonly maskPredicate: MaskitoElementPredicate = async (el) =>
    (el as HTMLIonInputElement).getInputElement();

  protected selectOptions = SELECT_INTERFACE_OPTIONS;

  confirm() {
    if (!this.configForm.valid) {
      this.configForm.markAllAsTouched();
      return;
    }

    const config = this.parseForm();

    if (!config) return;

    this.modalController.dismiss(config);
  }

  private parseForm(): ListShopConfig | null {
    const { budget: bg, storeId } = this.configForm.getRawValue();

    const budget = parseFloat(bg.replace(/[^0-9.]/g, ''));

    if (isNaN(budget)) {
      this.configForm.get('budget')?.setErrors({ invalid: true });
      return null;
    }

    const store = this.getStoreSelected(storeId);

    return {
      store,
      budget,
    };
  }

  private getStoreSelected(storeId: string): Store {
    return this.stores().find((store) => store.id === storeId)!;
  }
}
