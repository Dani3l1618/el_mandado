import { Component, computed, input, model } from '@angular/core';
import { IonChip, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { OrderState, ToggleChipConfig } from '../../models/toggle.model';

const imports = [IonChip, IonLabel, IonIcon];

@Component({
  selector: 'app-shared-chip-toggle',
  templateUrl: './shared-chip-toggle.component.html',
  styleUrls: ['./shared-chip-toggle.component.scss'],
  imports,
})
export class SharedChipToggleComponent {
  private readonly configBySort: Record<OrderState, ToggleChipConfig> = {
    [OrderState.Ascending]: {
      icon: 'arrow-up',
      color: 'secondary',
      outline: true,
    },
    [OrderState.Descending]: {
      icon: 'arrow-down',
      color: 'secondary',
      outline: true,
    },
    [OrderState.Unsorted]: {
      icon: 'swap-vertical',
      color: 'secondary',
      outline: false,
    },
  };

  private readonly toggleStateMap: Record<OrderState, OrderState> = {
    [OrderState.Unsorted]: OrderState.Ascending,
    [OrderState.Ascending]: OrderState.Descending,
    [OrderState.Descending]: OrderState.Unsorted,
  };

  label = input.required<string>();
  state = model<OrderState>(OrderState.Unsorted);

  protected config = computed(() => this.configBySort[this.state()]);

  protected toggle() {
    this.state.update((current) => this.toggleStateMap[current]);
  }
}
