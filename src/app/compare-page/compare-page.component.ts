import { Component, OnInit } from '@angular/core';
import { SmartphoneCharacteristic } from '../constants';
import { ICompareProducts, StorageService } from '../services/storage.service';
import { CrudService } from '../services/crud.service';
import { CompareService } from '../services/compare.service';
import { ICharacteristic } from '../types';
import { forkJoin } from 'rxjs';
import { element } from 'protractor';

@Component({
  selector: 'app-compare-page',
  templateUrl: './compare-page.component.html',
  styleUrls: ['./compare-page.component.scss'],
})
export class ComparePageComponent implements OnInit {
  public smartpphoneField = SmartphoneCharacteristic;
  public smartphoneArrField = Object.keys(this.smartpphoneField);
  public productsCharacteristics: ICharacteristic[];
  public compareProducts: ICompareProducts[];
  public productsEntriesCharacteristics: [string, any][][];

  constructor(private storage: StorageService, private crud: CrudService, private compare: CompareService) {}

  ngOnInit(): void {
    this.storage.compareProducts$.subscribe((value: ICompareProducts[]) => {
      this.compareProducts = value;
    });
    forkJoin(
      this.compareProducts.map((element: ICompareProducts) =>
        this.crud.getObjectByRef('characteristics', element.characteristic),
      ),
    ).subscribe((value: ICharacteristic[]) => {
      this.productsCharacteristics = value;
      this.productsEntriesCharacteristics = value.map((element) => Object.entries(element));
      console.log(this.productsEntriesCharacteristics);
    });
  }
}
