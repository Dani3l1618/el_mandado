import { inject, Pipe, PipeTransform } from '@angular/core';
import { AdressPipe } from 'src/app/shared';
import { Store } from '../../tiendas/models';

@Pipe({
  name: 'listShopStoreSelect',
  standalone: true,
})
export class ListShopStoreSelectPipe implements PipeTransform {
  private adressPipe = inject(AdressPipe);
  transform(value: Store): string {
    const adress = this.adressPipe.transform(value);
    return `${value.chain} (${adress})`;
  }
}
