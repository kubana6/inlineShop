import { Component } from '@angular/core';
import { CATEGORIES } from '../mock-category';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  categories = CATEGORIES;

  popular = 'POPULAR';

  BEST = 'BEST FEEDBACK';
}
