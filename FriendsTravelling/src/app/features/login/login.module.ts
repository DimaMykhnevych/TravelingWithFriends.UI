import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginViewComponent, RegisterViewComponent } from './containers';
import { LoginRoutingModule } from './routes/login-routing.module';
import { UserService } from './services/user.service';
import { EmailConfirmationComponent } from './components/email-confirmation/email-confirmation.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/layout/material';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    LoginRoutingModule,
    RouterModule,
    MaterialModule,
  ],
  declarations: [
    LoginViewComponent,
    LoginFormComponent,
    RegisterViewComponent,
    RegisterFormComponent,
    EmailConfirmationComponent,
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
