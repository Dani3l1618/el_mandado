import { Component, inject, OnInit } from '@angular/core';
import { ListShopService } from '../../services/list-shop.service';

@Component({
  selector: 'app-list-shop-info',
  templateUrl: './list-shop-info.component.html',
  styleUrls: ['./list-shop-info.component.scss'],
  standalone: true,
})
export class ListShopInfoComponent implements OnInit {
  private listShopService = inject(ListShopService);

  config = this.listShopService.storeConfig;

  constructor() {}

  ngOnInit() {
    console.log(this.listShopService.listShopState());
  }
}
