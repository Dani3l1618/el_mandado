import { ConfirmDialog } from 'src/app/shared';
import { ListShopCurrentDraft, ListShopMode } from '../models/list-shop.model';

export const LS_NW_WARN_EXIT: ConfirmDialog = {
  title: 'Cancelar compra',
  question: '¿Cancelar compra y eliminar la lista?',
  confirmText: 'Aceptar',
};

export const LS_DF_WARN_EXIT: ConfirmDialog = {
  title: 'Cancelar edición',
  question: 'Al salir, se perderán los cambios.',
  confirmText: 'Aceptar',
};

export const LS_NW_WARN_FINISH: ConfirmDialog = {
  title: 'Terminar compras',
  question: '¿Finalizar día de shopping?',
  confirmText: 'Aceptar',
};

export const LS_DF_WARN_FINISH: ConfirmDialog = {
  title: 'Guardar borrador',
  question: 'Al guardar el borrador, puedes editarlo más tarde.',
  confirmText: 'Aceptar',
};

export const LS_DF_WARN_ARCHIVE: ConfirmDialog = {
  title: 'Guardar lista',
  question: 'Al guardar la lista, ya no podrá ser modificada',
  confirmText: 'Aceptar',
};

export const LS_DF_WARN_DELETE: ConfirmDialog = {
  title: 'Eliminar borrador',
  question: 'Al eliminar el borrador, no se podrá recuperar',
  confirmText: 'Aceptar',
};

export const LS_DF_RETRIEVE: ConfirmDialog = {
  title: 'Cierre inesperado',
  question:
    'Se ha detectado un cierre inesperado mientras hacias la lista, ¿Recuperar lista?',
  confirmText: 'Aceptar',
  detail: '(Al cerrar esta ventana, se perderá el progreso.)',
};

export const LS_MODE: Record<string, ListShopMode> = {
  'new-list': 'new',
  'draft-list': 'draft',
  'view-list': 'view',
};

export const INITIAL_CURRENT_DRAFT: ListShopCurrentDraft = {
  draft: null,
  new: null,
  none: null,
  view: null,
};
