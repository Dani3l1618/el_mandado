import { MaskitoOptions } from '@maskito/core';
import { maskitoNumberOptionsGenerator } from '@maskito/kit';
import { IMaskito } from '../models/maskito.model';

export const MASK_CURRECY: MaskitoOptions = {
  ...maskitoNumberOptionsGenerator({
    decimalZeroPadding: false,
    precision: 2,
    decimalSeparator: '.',
    min: 10,
    prefix: '$',
    thousandSeparator: ',',
    max: 10000,
  }),
};

export const MASK_OPTIONS: IMaskito = {
  options: MASK_CURRECY,
  predicate: async (el) => (el as HTMLIonInputElement).getInputElement(),
};
