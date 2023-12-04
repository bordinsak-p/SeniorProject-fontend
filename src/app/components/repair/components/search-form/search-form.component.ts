import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-search-form',
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent {
    @Input() searchForm!: FormGroup;
    @Input() status: any

    @Output() onSearchEvent = new EventEmitter();
    @Output() onClearEvent = new EventEmitter();

    onSearch() {
        this.onSearchEvent.emit();
    }

    onClear() {
        this.onClearEvent.emit();
    }
}
