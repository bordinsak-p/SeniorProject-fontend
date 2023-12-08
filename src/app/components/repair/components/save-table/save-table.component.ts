import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Column } from '../../constants/table-inteface';
import { Equipments } from 'src/app/components/equipment/models/equipments';

@Component({
  selector: 'app-save-table',
  templateUrl: './save-table.component.html',
  // styleUrls: ['./save-table.component.scss']
})
export class SaveTableComponent {
    selectCheckBox

    @Input() equipments: Equipments[]
    @Input() cols: Column

    @Output() onSeletedRepairEvent = new EventEmitter()


    onOpen(e: any, id: number) {
        this.onSeletedRepairEvent.emit({e, id})
    }
}
