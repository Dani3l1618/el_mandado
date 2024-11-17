import { Component, computed, effect, inject, signal } from '@angular/core';
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
import {
  SharedDialogFooterComponent,
  SharedDialogHeaderComponent,
  StoreChain,
} from 'src/app/shared';
import { Store, StoreForm } from '../../models';
import { TiendaService } from '../../service/tienda.service';

const imports = [
  IonInput,
  IonItem,
  IonContent,
  IonSelect,
  IonSelectOption,
  SharedDialogHeaderComponent,
  SharedDialogFooterComponent,
  ReactiveFormsModule,
];

@Component({
  selector: 'app-tiendas-form',
  templateUrl: './tiendas-form.component.html',
  styleUrls: ['./tiendas-form.component.scss'],
  standalone: true,
  imports,
})
export class TiendasFormComponent {
  private modalController = inject(ModalController);
  private storeService = inject(TiendaService);
  private fb = inject(NonNullableFormBuilder);

  storeInEdit = this.storeService.storeInEdit;
  editMode = computed(() => this.storeInEdit() !== null);
  title = computed(() => (this.editMode() ? 'Editar tienda' : 'Nueva tienda'));
  confirmBtn = computed(() => (this.editMode() ? 'Guardar' : 'Crear'));

  storeForm = this.fb.group({
    chain: this.fb.control<keyof typeof StoreChain>(
      'none',
      Validators.required,
    ),
    street: this.fb.control('', Validators.required),
    city: this.fb.control('', Validators.required),
    colonia: this.fb.control('', Validators.required),
    state: this.fb.control('', Validators.required),
    postalCode: this.fb.control('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  protected interfaceOption = {
    cssClass: 'input-select',
  };

  protected storeCatalog = signal(this.storeService.getStoreCatalog());
  protected stateCatalog = signal(this.storeService.getStateCatalog());

  constructor() {
    effect(() => {
      if (this.editMode()) {
        const store = this.storeInEdit()!;

        this.storeForm.patchValue(this.createStoreForm(store));
      }
    });
  }

  protected confirm() {
    if (this.storeForm.invalid) {
      this.storeForm.markAllAsTouched();
      return;
    }

    const newStore = this.storeForm.getRawValue();

    if (this.editMode()) {
      this.storeService.editStore(this.storeInEdit()!.id, newStore);
    } else {
      this.storeService.saveStore(newStore);
    }

    this.modalController.dismiss(true);
  }

  private createStoreForm(store: Store): StoreForm {
    const chain = this.storeService.getStoreChainKey(store.chain);

    return {
      chain,
      city: store.city,
      colonia: store.colonia,
      postalCode: store.postalCode,
      state: store.state,
      street: store.street,
    };
  }
}
