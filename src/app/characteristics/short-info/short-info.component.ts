import { Component, Input, OnInit } from '@angular/core';
import { ICharacteristic, IProducts } from '../../types';
import { CrudService } from '../../services/crud.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-short-info',
  templateUrl: './short-info.component.html',
  styleUrls: ['./short-info.component.scss'],
})
export class ShortInfoComponent implements OnInit {
  @Input() public characteristic: ICharacteristic;

  constructor(private crud: CrudService, private storage: StorageService) {}

  ngOnInit(): void {}
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
