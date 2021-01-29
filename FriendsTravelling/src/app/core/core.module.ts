import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, AuthModule.forRoot(), TranslateModule],
  exports: [TranslateModule],
  declarations: [],
})
export class CoreModule {}
