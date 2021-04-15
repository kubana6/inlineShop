// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';

// @Component({
//   selector: 'app-form-order-information',
//   templateUrl: './form-order-information.component.html',
//   styleUrls: ['./form-order-information.component.scss']
// })
// export class FormOrderInformationComponent implements OnInit {

//   myFirstReactiveForm: FormGroup;

//   constructor(private fb: FormBuilder) { }

//   ngOnInit() {
//     this.initForm();
//   }

//   onSubmit() {
//     const controls = this.myFirstReactiveForm.controls;

//     if (this.myFirstReactiveForm.invalid) {
//       Object.keys(controls)
//         .forEach(controlName => controls[controlName].markAsTouched());

//       return;
//     }

//     /** TODO: Обработка данных формы */
//     console.log(this.myFirstReactiveForm.value);
//   }

//   isControlInvalid(controlName: string): boolean {
//     const control = this.myFirstReactiveForm.controls[controlName];

//     const result = control.invalid && control.touched;

//     return result;
//   }

//   private initForm() {
//     this.myFirstReactiveForm = this.fb.group({
//       name: ['', [
//         Validators.required,
//         Validators.pattern(/[А-я]/)
//       ]
//       ],
//       email: ['', [
//         Validators.required, Validators.email
//       ]
//       ]
//     });
//   }
// }
