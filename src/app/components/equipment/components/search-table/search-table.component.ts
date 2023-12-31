import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Column } from '../../constants/table-inteface'

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  // styleUrls: ['./search-table.component.scss']
})
export class SearchTableComponent {
  selectCheckBox: any[]
  
  @Input() equipments!: any[];
  @Input() cols!: Column[];
  
  @Output() onDeleteInRowEvent = new EventEmitter();
  @Output() onEditEvent = new EventEmitter();
  @Output() onDeleteEvent = new EventEmitter();
  @Output() onSelectInRowEvent = new EventEmitter();
  @Output() onOpenDialogEvent = new EventEmitter();
  @Output() onSelectInRowToPrintEvent = new EventEmitter()

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

  onSelectCheckBox() {
    this.onSelectInRowEvent.emit(this.selectCheckBox)
  }

  onOpenDialog(e: any, id: number) {
    this.onOpenDialogEvent.emit({e, id})
  }

  onSelectToPrint() {
    this.onSelectInRowToPrintEvent.emit(this.selectCheckBox)
  }
}
