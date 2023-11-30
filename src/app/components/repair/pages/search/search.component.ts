import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    searchForm: FormGroup

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.onInitForm()
    }

    onInitForm() {
        this.searchForm = this.fb.group({
            equipmentId: [null],
            equipmentName: [null],
            status: [null],
            budgetYear: [null],
            username: [null]
        })
    }

    onSearch() {
        console.log(this.searchForm.getRawValue());
    }

    onClear() {
        this.searchForm.reset() 
    }
}
