import { Component, Input, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { IDetailsOrders, IOrders } from '../../types';
import { CrudService } from '../../services/crud.service';
import { StorageService } from '../../services/storage.service';

const treeData: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
      },
      {
        name: 'Orange',
        children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
      },
    ],
  },
];

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

@Component({
  selector: 'app-tree-orders',
  templateUrl: './tree-orders.component.html',
  styleUrls: ['./tree-orders.component.scss'],
})
export class TreeOrdersComponent implements OnInit {
  @Input() orders: IOrders[];

  public userId: string;

  public detailOrders: IDetailsOrders[];

  panelOpenState = false;

  constructor(private crud: CrudService, private storage: StorageService) {}

  ngOnInit(): void {
    this.userId = this.storage.user.id;

    this.crud.findField('orders', 'userId', this.userId).subscribe((value: IDetailsOrders[]) => {
      this.detailOrders = value;
    });
  }
}
