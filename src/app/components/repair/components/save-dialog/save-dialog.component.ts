import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-save-dialog',
  templateUrl: './save-dialog.component.html',
//   styleUrls: ['./save-dialog.component.scss']
})
export class SaveDialogComponent {
    @Input() visible: any
    @Input() viewForm: FormGroup
    @Input() equipmentType: any[]

    @Output() onCloseDialogEvent = new EventEmitter()
    @Output() onSaveEvent = new EventEmitter()

    onClose() {
        this.onCloseDialogEvent.emit()
    }

    onSave() {
        this.onSaveEvent.emit()
    }
}
