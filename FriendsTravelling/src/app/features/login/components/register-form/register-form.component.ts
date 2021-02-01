import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RegistrationForm } from '../../../../core/auth';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  @Output()
  public submit: EventEmitter<RegistrationForm> = new EventEmitter<RegistrationForm>();

  public form: FormGroup;
  public submitted: boolean = false;

  constructor(private _builder: FormBuilder) {
    this.form = this._builder.group({});
  }

  public ngOnInit(): void {
    this.form = this._builder.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      age: new FormControl('', Validators.required),
    });

    this.form.valueChanges.subscribe((value: RegistrationForm) => {
      if (value.password !== value.confirmPassword && value.password == '') {
        this.form.controls.password.setErrors({ notMatch: true });
        this.form.controls.confirmPassword.setErrors({ notMatch: true });
      } else {
        this.form.controls.password.setErrors(null);
        this.form.controls.confirmPassword.setErrors(null);
      }
    });
  }

  public onSubmit(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    this.submitted = true;

    this.submit.emit(this.form.value);
  }

  public getErrorMessage(): string {
    if (
      this.form.controls.password.hasError('notMatch') &&
      this.form.controls.confirmPassword.hasError('notMatch')
    ) {
      return "Passwords don't match";
    } else {
      this.form.controls.password.setErrors(null);
      this.form.controls.confirmPassword.setErrors(null);
      return '';
    }
  }
}
