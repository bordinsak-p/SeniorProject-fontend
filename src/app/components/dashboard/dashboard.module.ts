import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Dialog, DialogModule } from 'primeng/dialog';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenubarModule } from 'primeng/menubar';
import { ListboxModule } from 'primeng/listbox';
import { PanelModule } from 'primeng/panel';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { FocusTrapModule } from 'primeng/focustrap';
import { TreeTableModule } from 'primeng/treetable';
import { TreeModule } from 'primeng/tree';
import { MultiSelectModule } from 'primeng/multiselect';
import { CardsComponent } from './components/cards/cards.component';
import { ChartOneComponent } from './components/chart-one/chart-one.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        DashboardsRoutingModule,
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
    ],
    declarations: [DashboardComponent, CardsComponent, ChartOneComponent]
})
export class DashboardModule { }
