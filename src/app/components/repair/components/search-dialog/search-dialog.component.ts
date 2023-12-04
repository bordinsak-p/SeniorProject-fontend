import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-search-dialog',
    templateUrl: './search-dialog.component.html',
    styleUrls: ['./search-dialog.component.scss'],
})
export class SearchDialogComponent {
    @Input() visible: any;
    @Input() searchDialog!: FormGroup
}
