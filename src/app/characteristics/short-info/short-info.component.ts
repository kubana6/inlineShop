import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ICharacteristic, IProducts } from '../../types';
import { CrudService } from '../../services/crud.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-short-info',
  templateUrl: './short-info.component.html',
  styleUrls: ['./short-info.component.scss'],
})
export class ShortInfoComponent implements OnInit {
  public characteristic: ICharacteristic;

  public ratingValue: number = 0;

  constructor(private crud: CrudService, private storage: StorageService) {}

  ngOnInit(): void {
    this.storage.currentCharacteristics$.subscribe((value: ICharacteristic) => {
      this.characteristic = value;
      this.ratingValue = value.feedback.rating;
    });
  }

  public buy(): void {
    this.crud
      .getObjectByRef(`${this.characteristic.type}s`, this.characteristic.productId)
      .subscribe((value: IProducts) => {
        const data = {
          ...value,
          id: this.characteristic.productId,
        };
        this.storage.buy(data);
      });
  }
}
