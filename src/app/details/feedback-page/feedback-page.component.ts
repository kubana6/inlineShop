import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StarRatingComponent } from 'ng-starrating';
import { PageEvent } from '@angular/material/paginator';
import { ICharacteristic, ICustomersFeedback, IFeedBack, IUser } from '../../types';
import { StorageService } from '../../services/storage.service';
import { OrderValidators } from '../../validators/order.validators';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.scss'],
})
export class FeedbackPageComponent implements OnInit {
  public characteristic: ICharacteristic;

  @Input() charactId: string;

  public user: IUser;

  public disabledButton: boolean = true;

  public length: number;

  public pageSize: number = 10;

  public pageSizeOptions: number[] = [1, 5, 10, 15];

  public currentFeedbackPage: ICustomersFeedback[];

  public pageIndex: number = 0;

  public commentUser = new FormControl('', [Validators.required]);

  public raitingUser: number = 0;

  constructor(public storage: StorageService, private crud: CrudService) {}

  ngOnInit(): void {
    this.storage.user$.subscribe((value: IUser) => {
      this.user = value;
    });

    this.storage.currentCharacteristics$.subscribe((value: ICharacteristic) => {
      this.characteristic = value;
      this.length = value.feedback.count;
      this.currentFeedbackPage = value.feedback.customers_feedback.slice(
        this.pageIndex * this.pageSize,
        (this.pageIndex + 1) * this.pageSize,
      );
      console.log(this.currentFeedbackPage);
    });
  }

  public onRate(event: { oldValue: number; newValue: number; starRating: StarRatingComponent }) {
    this.disabledButton = false;
    this.raitingUser = event.newValue;
  }

  public onSubmit() {
    console.log(this.commentUser.value, this.raitingUser);
    this.disabledButton = true;
    const count = +this.characteristic.feedback.count + 1;
    const sum = +this.characteristic.feedback.sum + this.raitingUser;
    const rating = count === 0 && sum === 0 ? 0 : sum / count;
    const customers_feedback = [
      ...this.characteristic.feedback.customers_feedback,
      {
        name: this.user.name,
        id: this.user.id,
        photo: this.user.photo,
        date: new Date().toString(),
        rating: this.raitingUser,
        text: this.commentUser.value,
      },
    ];
    const feedback = {
      count,
      sum,
      rating,
      customers_feedback,
    };
    this.crud.updateObject('characteristics', this.charactId, { feedback }, true);
    this.commentUser.reset();
    this.raitingUser = 0;
    this.disabledButton = false;
  }

  public getErrorMessage() {
    return 'You must enter a value';
  }

  public changePage(event: PageEvent) {
    console.log(event);
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.currentFeedbackPage = this.characteristic.feedback.customers_feedback.slice(
      this.pageIndex * this.pageSize,
      (this.pageIndex + 1) * this.pageSize,
    );
  }

  public trackByFn(index, item): string {
    return item.id;
  }
}
