import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginViewComponent, RegisterViewComponent } from './containers';
import { LoginRoutingModule } from './routes/login-routing.module';
import { UserService } from './services/user.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, CoreModule, LoginRoutingModule],
  declarations: [
    LoginViewComponent,
    LoginFormComponent,
    RegisterViewComponent,
    RegisterFormComponent,
  ],
})
export class LoginModule {
  public static forRoot(): ModuleWithProviders<LoginModule> {
    return {
      ngModule: LoginModule,
      providers: [UserService],
    };
  }
}
