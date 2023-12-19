import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrcodeRoutingModule } from './qrcode-routing.module';
import { QrcodeComponent } from './qrcode.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { SharedModule } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FocusTrapModule } from 'primeng/focustrap';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ListboxModule } from 'primeng/listbox';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { StepsModule } from 'primeng/steps';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';


@NgModule({
  declarations: [
    QrcodeComponent,
  ],
  imports: [
    CommonModule,
    QrcodeRoutingModule,
    FormsModule,
    ChartModule,
    MenuModule,
    TableModule,
    StyleClassModule,
    PanelMenuModule,
    ButtonModule,
    SharedModule,
    DialogModule,
    ConfirmDialogModule,
    DropdownModule,
    MenubarModule,
    ListboxModule,
    RadioButtonModule,
    PanelModule,
    AccordionModule,
    CalendarModule,
    TabViewModule,
    FocusTrapModule,
    CheckboxModule,
    TreeTableModule,
    TreeModule,
    InputTextModule,
    ReactiveFormsModule,
    InputNumberModule,
    PaginatorModule,
    InputSwitchModule,
    MultiSelectModule,
    HttpClientModule,
    CardModule,
    BreadcrumbModule,
    InputTextareaModule,
    ToastModule,
    TagModule,
    StepsModule,
    TooltipModule
  ]
})
export class QrcodeModule { }
