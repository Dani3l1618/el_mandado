import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { IonAvatar, IonImg, IonSkeletonText } from '@ionic/angular/standalone';
import { StoreMedia } from '../../models/store.model';
import { MediaStorePipe } from '../../pipes/media-store.pipe';

const imports = [IonAvatar, IonImg, IonSkeletonText, NgClass, MediaStorePipe];

@Component({
  selector: 'app-shared-store-img',
  templateUrl: './shared-store-img.component.html',
  styleUrls: ['./shared-store-img.component.scss'],
  imports,
})
export class SharedStoreImgComponent {
  storeImg = input.required<StoreMedia | undefined>();
  loading = input.required<boolean>();
  slot = input<string>('start');

  readonly DEFAULT_IMG = StoreMedia.none;
}
