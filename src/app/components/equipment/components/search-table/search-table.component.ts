import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Column } from '../../constants/table-inteface'

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  // styleUrls: ['./search-table.component.scss']
})
export class SearchTableComponent {
  @Input() equipments!: any[];
  @Input() cols!: Column[];

  @Output() onDeleteInRowEvent = new EventEmitter();
  @Output() onEditEvent = new EventEmitter();
  @Output() onDeleteEvent = new EventEmitter();

  constructor() {
    // TODO
  }

  onDeleteInRow(id: any) {
    this.onDeleteInRowEvent.emit(id);
  }

  onEdit(id: any) {
    this.onEditEvent.emit(id);
  }

  onDelete(id: any[]) {
    this.onDeleteEvent.emit(id)
  }
}
