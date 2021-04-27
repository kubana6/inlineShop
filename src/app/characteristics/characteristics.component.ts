import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../services/crud.service';
import { ICharacteristic, IProducts } from '../types';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-characteristics',
  templateUrl: './characteristics.component.html',
  styleUrls: ['./characteristics.component.scss'],
})
export class CharacteristicsComponent {
  @Input() public characteristic: ICharacteristic;

  @Input() public charactId: string;

  constructor(private route: ActivatedRoute, private crud: CrudService, private storage: StorageService) {}

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
