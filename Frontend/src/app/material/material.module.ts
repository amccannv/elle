import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MdButtonModule,
  MdCheckboxModule,
  MdSelectModule,
  MdCardModule,
  MdIconModule,
  MdInputModule,
  MdTooltipModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,

    MdButtonModule,
    MdCheckboxModule,
    MdSelectModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdTooltipModule,
  ],
  declarations: [],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,

    MdButtonModule,
    MdCheckboxModule,
    MdSelectModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdTooltipModule,
  ]
})
export class MaterialModule { }
