import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MdButtonModule,
  MdCheckboxModule,
  MdSelectModule,
  MdCardModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,

    MdButtonModule,
    MdCheckboxModule,
    MdSelectModule,
    MdCardModule,
  ],
  declarations: [],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdSelectModule,
    MdCardModule,
  ]
})
export class MaterialModule { }
