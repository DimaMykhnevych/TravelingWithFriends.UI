import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './layout/material';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeModule } from './features/home/home.module';
import { LoginModule } from './features/login';
import { PersonalPageModule } from './features/personal-page/personal-page.module';
import { JourneysModule } from './features/journeys';

import { ConfirmDialogComponent } from './layout/confirm-dialog/confirm-dialog.component';
import { NotificationDialogComponent } from './layout/notification-dialog/notification-dialog.component';
import { JourneyRequestResponseModule } from './features/journey-request-response';
import { JourneyDetailsDialogComponent } from './layout/journey-details-dialog/journey-details-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    NotificationDialogComponent,
    JourneyDetailsDialogComponent,
  ],
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
    JourneyRequestResponseModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) =>
          new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient],
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
