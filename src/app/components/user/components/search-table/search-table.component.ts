import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Column } from '../../constants/table-inteface';


@Component({
    selector: 'app-search-table',
    templateUrl: './search-table.component.html',
    // styleUrls: ['./search-table.component.scss'],
})
export class SearchTableComponent {
    SelectCheckBox: any[]
    
    @Input() users!: any[];
    @Input() cols!: Column[];

    
    @Output() onDeleteEvent = new EventEmitter();
    @Output() onDeleteInRowEvent = new EventEmitter();
    @Output() onSelectInRowEvent = new EventEmitter();
    @Output() onOpenDialogEvent = new EventEmitter();

    onDeleteInRow(id: any) {
        this.onDeleteInRowEvent.emit(id);
    }

    onDelete(id: any[]) {
        this.onDeleteEvent.emit(id);
    }

    onSelectCheckBox() {
        this.onSelectInRowEvent.emit(this.SelectCheckBox);
    }

    onOpenDialog(e: any, id: number) {
        this.onOpenDialogEvent.emit({ e, id })
    }
    
}
