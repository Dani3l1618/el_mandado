import { Component } from '@angular/core';
import { IonSearchbar } from '@ionic/angular/standalone';

const imports = [IonSearchbar];
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  imports,
})
export class SearchBarComponent {
  public search(term: string) {
    console.log(term);
  }
}
