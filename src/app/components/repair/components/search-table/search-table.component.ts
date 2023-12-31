import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Column } from '../../constants/table-inteface';

@Component({
    selector: 'app-search-table',
    templateUrl: './search-table.component.html',
    // styleUrls: ['./search-table.component.scss'],
})
export class SearchTableComponent {
    selectCheckBox: any[];

    @Input() repair: any[] = [];
    @Input() cols: Column;

    @Output() onEditEvent = new EventEmitter();
    @Output() onDeleteCheckBoxEvent = new EventEmitter();
    @Output() onDeleteInRowEvent = new EventEmitter();

    onEdit(id: number, equipmentPk: number, status: any) {
        this.onEditEvent.emit({ id, equipmentPk, status });
    }

    onDeletInRow(id: any) {
        this.onDeleteInRowEvent.emit(id);
    }

    onDeleteCheckBox() {
        this.onDeleteCheckBoxEvent.emit(this.selectCheckBox);
    }
}
