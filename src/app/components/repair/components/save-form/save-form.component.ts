import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-save-form',
  templateUrl: './save-form.component.html',
  styleUrls: ['./save-form.component.scss']
})
export class SaveFormComponent {
    @Input() saveForm: FormGroup

    @Output() onSearchEvent = new EventEmitter()
    @Output() onClaerEvent = new EventEmitter()

    onSearch() {
      this.onSearchEvent.emit()
    }

    onClear() {
      this.onClaerEvent.emit()
    }
}
