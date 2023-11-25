import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-save-form',
  templateUrl: './save-form.component.html',
  styleUrls: ['./save-form.component.scss']
})
export class SaveFormComponent {
  file: File | null = null

  @Input() saveForm!: FormGroup
  @Input() showImage! : any

  @Output() onSaveEvent = new EventEmitter()
  @Output() onClearEvent = new EventEmitter()
  @Output() onSelectedFileEvent = new EventEmitter()

  onSave() {
    this.onSaveEvent.emit()
  }

  onClear() {
    this.onClearEvent.emit()
  }

  onSelectedFile(e: any) {
    const metaImage = e.target.files[0]
    if(metaImage) {
      this.file = metaImage
      const readFile = new FileReader()
      readFile.readAsDataURL(metaImage)
      readFile.onload = () => {
        this.showImage = readFile.result
      }      
      this.onSelectedFileEvent.emit(this.file)
    }
  }
}
