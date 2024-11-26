import { Component, input, output } from '@angular/core';
import { IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';
const imports = [IonFabButton, IonFab, IonIcon];

@Component({
  selector: 'app-shared-fab',
  templateUrl: './shared-fab.component.html',
  styleUrls: ['./shared-fab.component.scss'],
  standalone: true,
  imports,
})
export class SharedFabComponent {
  action = output<void>();
  icon = input<string>('add');
  color = input<string>('secondary');
  size = input<'small' | undefined>(undefined);

  onClick() {
    this.action.emit();
  }
}
