import { Component, OnInit } from '@angular/core';
import {IonText} from "@ionic/angular/standalone"

const imports = [
  IonText
]

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  standalone: true,
  imports
})
export class TitleComponent  {}
