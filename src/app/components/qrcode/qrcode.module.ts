import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrcodeRoutingModule } from './qrcode-routing.module';
import { QrcodeComponent } from './qrcode.component';


@NgModule({
  declarations: [
    QrcodeComponent
  ],
  imports: [
    CommonModule,
    QrcodeRoutingModule
  ]
})
export class QrcodeModule { }
