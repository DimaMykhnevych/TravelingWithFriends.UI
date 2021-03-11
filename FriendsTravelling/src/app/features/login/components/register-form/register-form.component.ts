import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RegistrationForm } from '../../../../core/auth';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit, OnDestroy {
  @Input() public set isUsernameAlreadyTaken(result: boolean) {
    this._isUsernameAlreadyTaken = result;
  }
  public get isUsernameAlreadyTaken(): boolean {
    return this._isUsernameAlreadyTaken;
  }
  @Input() public set isAddingUser(result: boolean) {
    this._isAddingUser = result;
  }
  public get isAddingUser(): boolean {
    return this._isAddingUser;
  }
  @Output()
  public submit: EventEmitter<RegistrationForm> = new EventEmitter<RegistrationForm>();

  public form: FormGroup;
  public submitted: boolean = false;
  public passwordsNotMatches: boolean = false;

  private _destroy$: Subject<void> = new Subject<void>();
  private _isUsernameAlreadyTaken: boolean;
  private _isAddingUser: boolean;

  constructor(private _builder: FormBuilder) {
    this.form = this._builder.group({});
  }

  public ngOnInit(): void {
    this.initializeForm();
    this.subscribeOnFormValueChanges();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public initializeForm(): void {
    this.form = this._builder.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$_!%*?&])[A-Za-z\\d@$_!%*?&]{7,}$'
        ),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, Validators.min(18)]),
    });
  }

  public subscribeOnFormValueChanges(): void {
    this.form.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe((value: RegistrationForm) => {
        if (value.password !== value.confirmPassword) {
          this.passwordsNotMatches = true;
        } else {
          this.passwordsNotMatches = false;
        }
      });
  }

  get username() {
    return this.form.get('username');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  get country() {
    return this.form.get('country');
  }

  get city() {
    return this.form.get('city');
  }

  get age() {
    return this.form.get('age');
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
