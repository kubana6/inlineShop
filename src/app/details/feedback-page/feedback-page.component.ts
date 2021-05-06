import {Component, Input, OnInit} from '@angular/core';
import {ICharacteristic, IUser} from '../../types';
import {StorageService} from '../../services/storage.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderValidators} from '../../validators/order.validators';
import {StarRatingComponent} from 'ng-starrating';
import {CrudService} from '../../services/crud.service';

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.scss']
})
export class FeedbackPageComponent implements OnInit {
  @Input() characteristic:ICharacteristic
  @Input() charactId:string;
  public user: IUser
  public disabledButton: boolean = true

  public commentUser = new FormControl('', [Validators.required]);
  public raitingUser: number = 0
  constructor(public storage: StorageService,  private crud : CrudService) { }

  ngOnInit(): void {
    this.storage.user$.subscribe((value:IUser)=> {
      this.user = value
    })
  }

  public onRate(event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    this.disabledButton = false
    this.raitingUser = event.newValue
  }

  public onSubmit() {
     console.log(this.commentUser.value,this.raitingUser)
    this.disabledButton = true
    const count = +this.characteristic.feedback.count + 1
    const sum = +this.characteristic.feedback.sum + this.raitingUser;
    const rating =( count === 0 && sum === 0) ? 0 : sum /count
    const customers_feedback = [...this.characteristic.feedback.customers_feedback,
      {
        name: this.user.name,
        id: this.user.id,
        photo:this.user.photo,
        date: new Date().toString(),
        rating:this.raitingUser,
        text: this.commentUser.value

      }
    ]
    const feedback = {
       count,
       sum,
       rating,
       customers_feedback
    }
     this.crud.updateObject('characteristics', this.charactId,{feedback}, true)
    this.commentUser.reset()
    this.raitingUser = 0
    this.disabledButton = false
  }

  public getErrorMessage() {
      return 'You must enter a value';
  }
}
