import { ListShopMode } from '../models/list-shop.model';

export const LS_NW_WARN_EXIT = {
  title: 'Cancelar compra',
  question: '¿Cancelar compra y eliminar la lista?',
  confirmText: 'Aceptar',
};

export const LS_DF_WARN_EXIT = {
  title: 'Cancelar edición',
  question: 'Al salir, se perderán los cambios.',
  confirmText: 'Aceptar',
};

export const LS_NW_WARN_FINISH = {
  title: 'Terminar compras',
  question: '¿Finalizar día de shopping?',
  confirmText: 'Aceptar',
};

export const LS_DF_WARN_FINISH = {
  title: 'Guardar borrador',
  question: 'Al guardar el borrador, puedes editarlo más tarde.',
  confirmText: 'Aceptar',
};

export const LS_DF_WARN_ARCHIVE = {
  title: 'Guardar lista',
  question: 'Al guardar la lista, ya no podrá ser modificada',
  confirmText: 'Aceptar',
};

export const LS_DF_WARN_DELETE = {
  title: 'Eliminar borrador',
  question: 'Al eliminar el borrador, no se podrá recuperar',
  confirmText: 'Aceptar',
};

export const LS_MODE: Record<string, ListShopMode> = {
  'new-list': 'new',
  'draft-list': 'draft',
  'view-list': 'view',
};
