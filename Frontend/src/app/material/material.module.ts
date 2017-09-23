import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MdButtonModule,
  MdCheckboxModule,
  MdSelectModule,
  MdCardModule,
  MdIconModule,
  MdInputModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,

    MdButtonModule,
    MdCheckboxModule,
    MdSelectModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
  ],
  declarations: [],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdSelectModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
  ]
})
export class MaterialModule { }
