import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { retry, switchMap, take, tap } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';
import { CrudService } from '../services/crud.service';
import { ICart, IGoods, IUser } from '../types';
import { ModalWindowService } from '../services/modal-window.service';
import { OrderValidators } from '../validators/order.validators';

@Component({
  selector: 'app-form-order-information',
  templateUrl: './form-order-information.component.html',
  styleUrls: ['./form-order-information.component.scss'],
})
export class FormOrderInformationComponent implements OnInit, OnDestroy {
  private getUserData: Subscription;

  public userData: IUser;

  private postOrderData: Subscription;

  public formOrder: FormGroup;

  public carts: ICart[];

  public totalPrice = 0;
  public isInputDisabled = false;
  public moneyIsTight: boolean = false;

  constructor(
    private fb: FormBuilder,
    private storage: StorageService,
    private crud: CrudService,
    public modal: ModalWindowService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getUserData = this.storage.user$.subscribe((value) => {
      this.userData = value;
      this.carts = value.cart;

      this.totalPrice = value.cart.reduce((acc: number, rec: ICart) => {
        return acc + +rec.totalOrder;
      }, 0);
    });
  }

  ngOnDestroy(): void {
    this.getUserData.unsubscribe();
  }

  public onSubmit(): void {
    this.isInputDisabled = true;
    if (+this.userData.balance < this.totalPrice) {
      this.moneyIsTight = true;
      this.isInputDisabled = false;
      return;
    }
    if (this.formOrder.valid) {
      const date = new Date().toString();
      const formData = {
        ...this.formOrder.value,
        date,
        userId: this.userData.id,
        order: [...this.userData.cart],
      };

      this.postOrderData = this.crud
        .createEntity('orders', formData)
        .pipe(
          switchMap((id) => {
            if (id) {
              const updateDataUser = {
                balance: (+this.userData.balance - this.totalPrice).toString(),
                cart: [],
                orders: [
                  ...this.userData?.orders,
                  {
                    id,
                    date,
                  },
                ],
              };
              return this.crud.updateObject('users', this.userData.id, updateDataUser, true);
            }
            return id;
          }),
          tap(() => {
            this.formOrder.reset();
            this.isInputDisabled = false;
          }),
          take(1),
        )
        .subscribe();
    }
  }

  public isControlInvalid(controlName: string): boolean {
    const control = this.formOrder.controls[controlName];

    const result = control.invalid && control.touched;

    return result;
  }

  public errorsField(controlName: string): ValidationErrors {
    const control = this.formOrder.controls[controlName];

    return control.errors;
  }

  private initForm(): void {
    this.formOrder = this.fb.group({
      city: ['', [Validators.required, Validators.minLength(3), OrderValidators.onlyString]],
      street: ['', [Validators.required, Validators.minLength(3), OrderValidators.onlyString]],
      house: ['', [Validators.required, OrderValidators.onlyNumber]],
      corps: ['', [Validators.required, OrderValidators.onlyNumber]],
      entrance: ['', [Validators.required, OrderValidators.onlyNumber]],
      floor: ['', [Validators.required, OrderValidators.onlyNumber]],
      apartment: ['', [Validators.required, OrderValidators.onlyNumber]],
      fullName: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
          ),
        ],
      ],
      phone: ['', [Validators.required]],
    });
  }
}
