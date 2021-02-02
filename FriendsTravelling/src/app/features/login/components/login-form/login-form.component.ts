import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthForm } from '../../../../core/auth';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Output()
  public submit: EventEmitter<AuthForm> = new EventEmitter<AuthForm>();

  public form: FormGroup;
  public submitted: boolean = false;

  constructor(private _builder: FormBuilder) {
    this.form = this._builder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public ngOnInit(): void {}

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  public onSubmit(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.submit.emit(this.form.value);
  }
}
