import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Column } from '../../constants/table-inteface';

@Component({
    selector: 'app-search-table',
    templateUrl: './search-table.component.html',
    styleUrls: ['./search-table.component.scss'],
})
export class SearchTableComponent {
    selectCheckBox: any;

    @Input() repair: any[] = [];
    @Input() cols: Column;

    @Output() onEditEvent = new EventEmitter();

    onEdit(id: any) {}

    onDeletInRow(id: any) {}

    onDeleteCheckBox() {}
}
