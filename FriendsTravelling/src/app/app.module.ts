import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './layout/material.module';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeModule } from './features/home/home.module';
import { LoginModule } from './features/login';
import { PersonalPageModule } from './features/personal-page/personal-page.module';
import { UserInfoService } from './core/auth';
import { loadUserInfo } from './core/app-initializers/load-user-info.initializer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HomeModule,
    LoginModule,
    HttpClientModule,
    PersonalPageModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (userInfoService: UserInfoService) =>
        loadUserInfo(userInfoService),
      deps: [UserInfoService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
