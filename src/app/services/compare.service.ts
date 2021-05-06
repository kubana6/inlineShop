import { Injectable } from '@angular/core';
import { ICompareProducts, StorageService } from './storage.service';
import { IProducts } from '../types';

@Injectable({
  providedIn: 'root',
})
export class CompareService {
  constructor(private storage: StorageService) {}

  public addCompare(product: ICompareProducts): string | void {
    const data = this.storage.compareProducts;
    const updateData = [...data, product];
    this.storage.compareProducts = updateData;
    localStorage.setItem('compare', JSON.stringify(updateData));
  }

  public deleteCompare(product: ICompareProducts): void {
    const data = this.storage.compareProducts;
    const updateData = data.filter((element) => element.id !== product.id);
    this.storage.compareProducts = updateData;
    localStorage.setItem('compare', JSON.stringify(updateData));
  }

  public getCompareProductsById(id: string): boolean {
    const [data] = this.storage.compareProducts.filter((element) => element.id === id);

    return !!data;
  }
}
