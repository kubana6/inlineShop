import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';
import { CrudService } from '../services/crud.service';
import { ICart, IGoods, IUser } from '../types';
import { ModalWindowService } from '../services/modal-window.service';

@Component({
  selector: 'app-form-order-information',
  templateUrl: './form-order-information.component.html',
  styleUrls: ['./form-order-information.component.scss'],
})
export class FormOrderInformationComponent implements OnInit, OnDestroy {
  private getUserData: Subscription;

  public userData: IUser;

  private postOrderData: Subscription;

  private updateUserInformation: Subscription;

  private orderId: string;

  public formOrder: FormGroup;

  public informationOrder: IGoods[] = [];

  public totalPrice = 0;

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
    });
    this.informationOrder = this.storage.cartProduct.reduce((acc: IGoods[], rec: IGoods) => {
      const userCart = this.userData.cart.filter((cart) => cart.id === rec.id);
      this.totalPrice += +userCart[0].amount * +rec.price;
      const data = { amount: userCart[0].amount, ...rec };
      return [...acc, data];
    }, []);
  }

  ngOnDestroy(): void {
    this.getUserData.unsubscribe();
  }

  public onSubmit(): void {
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
          tap(() => this.formOrder.reset()),
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

  private initForm() {
    this.formOrder = this.fb.group({
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      house: [
        '',
        [
          // Validators.required,
        ],
      ],
      corps: [
        '',
        [
          // Validators.required,
        ],
      ],
      entrance: [
        '',
        [
          // Validators.required,
        ],
      ],
      floor: [
        '',
        [
          // Validators.required,
        ],
      ],
      apartment: [
        '',
        [
          // Validators.required,
        ],
      ],
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
