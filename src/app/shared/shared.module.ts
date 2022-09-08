import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TooltipModule } from 'primeng/tooltip';
import { OverlayPanelModule } from 'primeng/overlaypanel';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    SelectButtonModule,
    MultiSelectModule,
    CheckboxModule,
    ToastModule,
    DynamicDialogModule,
    TooltipModule,
    OverlayPanelModule
  ],
  exports: [
    CommonModule,
    ButtonModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    SelectButtonModule,
    MultiSelectModule,
    CheckboxModule,
    ToastModule,
    DynamicDialogModule,
    TooltipModule,
    OverlayPanelModule
  ]
})
export class SharedModule { }
