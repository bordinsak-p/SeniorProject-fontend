import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Column } from '../../constants/table-inteface';


@Component({
    selector: 'app-search-table',
    templateUrl: './search-table.component.html',
    // styleUrls: ['./search-table.component.scss'],
})
export class SearchTableComponent {
    @Input() users!: any[];
    @Input() cols!: Column[];

    @Output() onDeleteCheckbox = new EventEmitter()
}
