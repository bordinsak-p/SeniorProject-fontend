import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-save-form',
    templateUrl: './save-form.component.html',
    styleUrls: ['./save-form.component.scss'],
})
export class SaveFormComponent {
    file: File | null = null;

    @Input() saveForm!: FormGroup;
    @Input() showImage!: any;

    @Output() onSaveEvent = new EventEmitter();
    @Output() onClearEvent = new EventEmitter();
    @Output() onSelectedFileEvent = new EventEmitter();

    onSave() {
        this.showImage = null
        this.onSaveEvent.emit(this.showImage);
    }

    onClear() {
        this.showImage = null
        this.onClearEvent.emit(this.showImage);
    }

    onFileSelected(event: any) {
        const metaImage = event.target.files[0];
        if (metaImage) {
            this.file = metaImage;
            const reader = new FileReader();
            reader.readAsDataURL(metaImage);
            reader.onload = () => {
                this.showImage = reader.result;
            };
            this.onSelectedFileEvent.emit(this.file);
        }
    }
}
