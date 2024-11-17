import { ModalOptions } from '@ionic/angular/standalone';
import { SharedConfirmDialogComponent } from 'src/app/shared';
import { Store } from '../models';

export const TIENDA_DIALOG_DELETE: (store: Store) => ModalOptions = (
  store,
) => ({
  component: SharedConfirmDialogComponent,
  componentProps: {
    title: 'Eliminar tienda',
    question: `¿Estás seguro de eliminar la tienda ${store.chain}?`,
    detail: `Se eliminarán los datos de la tienda ${store.chain} (${store.street}). Al realizar esta acción, algunos registros podrían perder información.`,
    confirmText: 'Eliminar',
  },
});
