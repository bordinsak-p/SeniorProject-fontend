import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-save-form',
  templateUrl: './save-form.component.html',
  // styleUrls: ['./save-form.component.scss']
})
export class SaveFormComponent {

  @Input() saveForm!: FormGroup;
  @Input() roleOptions: any[] = [];
  @Input() setMode: boolean;

  @Output() onSaveEvent = new EventEmitter();
  @Output() onClearEvent = new EventEmitter();


  onSave() {
    this.onSaveEvent.emit(); 
  }

  onClear() {
    this.onClearEvent.emit();
  }

}
