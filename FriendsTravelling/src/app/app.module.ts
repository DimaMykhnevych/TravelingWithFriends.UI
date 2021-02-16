import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './layout/material';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeModule } from './features/home/home.module';
import { LoginModule } from './features/login';
import { PersonalPageModule } from './features/personal-page/personal-page.module';
import { JourneysModule } from './features/journeys';

import { UserInfoService } from './core/auth';
import { loadUserInfo } from './core/app-initializers/load-user-info.initializer';
import { ConfirmDialogComponent } from './layout/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [AppComponent, ConfirmDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    CommonModule,
    BrowserAnimationsModule,
    HomeModule,
    LoginModule,
    HttpClientModule,
    PersonalPageModule,
    ToastrModule.forRoot(),
    JourneysModule,
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
