import { inject, Pipe, PipeTransform } from '@angular/core';
import { MediaService } from '../services/media.service';
import { StoreMedia } from '../models/store.model';

@Pipe({
  name: 'mediaStore',
  standalone: true,
  pure: true,
})
export class MediaStorePipe implements PipeTransform {
  private mediaService = inject(MediaService);

  transform(value: StoreMedia): string {
    return this.mediaService.createFullMediaStorePath(value);
  }
}
