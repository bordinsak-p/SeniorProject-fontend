import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-dialog',
  templateUrl: './view-dialog.component.html',
  // styleUrls: ['./view-dialog.component.scss']
})
export class ViewDialogComponent {
  @Input() visible = false
  @Input() viewForm!: FormGroup
  @Input() showImage: any
}
