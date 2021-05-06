import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CrudService } from '../services/crud.service';
import { ICompareProducts, StorageService } from '../services/storage.service';
import { IProducts, IUser } from '../types';
import { CompareService } from '../services/compare.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-smartphones',
  templateUrl: './smartphones.component.html',
  styleUrls: ['./smartphones.component.scss'],
})
export class SmartphonesComponent implements OnInit, OnDestroy {
  private getData: Subscription;

  public products: IProducts[];

  public user: IUser;

  public typeProduct: string;

  public isChecked: boolean = false;
  private getDataCompare: Subscription;
  public compareProducts: ICompareProducts[];

  constructor(
    private service: CrudService,
    private storage: StorageService,
    private route: ActivatedRoute,
    public compare: CompareService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(switchMap((params) => params.getAll('product'))).subscribe((value: string) => {
      this.typeProduct = value;
      this.updateData();
    });
    this.storage.user$.subscribe((value: IUser) => {
      this.user = value;
    });
    this.getDataCompare = this.storage.compareProducts$.subscribe((value) => {
      this.compareProducts = value;
    });
  }

  public updateData(): void {
    this.getData = this.service.getData(this.typeProduct).subscribe((value: IProducts[]) => {
      this.products = value;
      this.storage.currentProducts = value;
    });
  }

  ngOnDestroy(): void {
    this.getData.unsubscribe();
    this.getDataCompare.unsubscribe();
  }

  public buy(product: IProducts): void {
    this.storage.buy(product);
  }

  public trackByFn(index, item): string {
    return item.id;
  }

  public changeCompare(checked: boolean, product: IProducts): void {
    const data = {
      id: product.id,
      characteristic: product.characteristic,
    };
    if (checked) {
      this.compare.addCompare(data);
    } else {
      this.compare.deleteCompare(data);
    }
  }
}
