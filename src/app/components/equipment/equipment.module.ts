import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { EquipmentRoutingModule } from './equipment-routing.module';
import { EquipmentComponent } from './equipment.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmationService, MessageService, SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FocusTrapModule } from 'primeng/focustrap';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { CardModule } from 'primeng/card';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TooltipModule } from 'primeng/tooltip';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { SearchTableComponent } from './components/search-table/search-table.component';
import { SaveFormComponent } from './components/save-form/save-form.component';
import { SearchComponent } from './pages/search/search.component';
import { SaveComponent } from './pages/save/save.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { ViewDialogComponent } from './components/view-dialog/view-dialog.component';
import { InputMaskModule } from 'primeng/inputmask';


@NgModule({
    declarations: [
        EquipmentComponent,
        SearchFormComponent,
        SearchTableComponent,
        SaveFormComponent,
        SearchComponent,
        SaveComponent,
        ViewDialogComponent,
    ],
    imports: [
        CommonModule,
        EquipmentRoutingModule,
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
        TooltipModule,
        InputMaskModule
    ],
    providers:[
        DatePipe,
        MessageService,
        ConfirmationService
    ]
})
export class EquipmentModule {}
