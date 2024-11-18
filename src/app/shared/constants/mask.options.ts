import { MaskitoOptions } from '@maskito/core';
import { maskitoNumberOptionsGenerator } from '@maskito/kit';

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
