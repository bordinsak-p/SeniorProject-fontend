import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  // styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  thaiFormattedDate : string;
  th: any;

  @Input() searchForm!: FormGroup 
  
  @Output() onSearchEvent = new EventEmitter();
  @Output() onClearEvent = new EventEmitter();

  constructor(private datePipe: DatePipe) {}

  onSearch() {
    this.onSearchEvent.emit()
  }

  onClear() {
    this.onClearEvent.emit()
  }
}
